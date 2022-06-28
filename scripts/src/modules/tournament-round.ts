import {ITournamentGame} from "./tournament-game";
import {STATUS, STATUS_COMPLETED, STATUS_PLANNED, STATUS_UNDERWAY} from "./status";
import {ITournament, TOURNAMENT_SCORE_BYE, TOURNAMENT_SCORE_LOSS} from "./tournament";
import {
  buildOpponentsCandidates,
  buildWorkTournamentPlayers,
  getByePlayer,
  ITournamentPlayer,
  pruneWorkTournamentPlayers, setUpPlayerGame,
  TOURNAMENT_BYE_PLAYER
} from "./tournament-player";
import {Err, Ok, Result} from "ts-results";
import shortid = require("shortid");
import {ICandidateGame} from "./candidate-game";
import {BLACK_PIECES, COLOR, WHITE_PIECES} from "./color";
import {alternatePlayingColor, idealPlayingColor} from "./candidate-player";

export type ITournamentRound = {
  id: string;
  games: ITournamentGame[];
  status: STATUS;
}

export const planRound = (players: ITournamentPlayer[]): ITournamentRound => {
  const tournamentRound: ITournamentRound = {
    id: shortid.generate(),
    games: [],
    status: STATUS_PLANNED
  }
  // build the workTournamentPlayers array
  let workTournamentPlayers: ITournamentPlayer[] = buildWorkTournamentPlayers(players);

  // Set the round bye player, if necessary
  let resultBye: Result<ITournamentPlayer, Error> = getByePlayer(workTournamentPlayers);
  if (resultBye.ok) {
    // We have a round bye player
    const byeGame: ITournamentGame = {
      id: shortid.generate(),
      whitePiecesPlayer: <ITournamentPlayer>resultBye.val,
      whitePiecesPlayerScore:TOURNAMENT_SCORE_BYE,
      blackPiecesPlayer: TOURNAMENT_BYE_PLAYER,
      blackPiecesPlayerScore: TOURNAMENT_SCORE_LOSS,
      status: STATUS_COMPLETED
    }
    tournamentRound['games'].push(byeGame)

    // remove the bye player from workTournamentPlayers
    workTournamentPlayers = pruneWorkTournamentPlayers(workTournamentPlayers, workTournamentPlayers[0].id);
  }

  // Attempt to pair players
  let resultColor: Result<COLOR, string>
  while (workTournamentPlayers.length > 0) {
    let candidateGame: ICandidateGame = {
      player_1: {
        candidate: {...workTournamentPlayers[0]},
        candidateColor: idealPlayingColor(workTournamentPlayers[0].lastTwoGamesColors),
      },
      player_2: {
        candidate: {...workTournamentPlayers[0]},
        candidateColor: idealPlayingColor(workTournamentPlayers[0].lastTwoGamesColors),
      }
    };
    const opponentCandidates = buildOpponentsCandidates(workTournamentPlayers);
    let colorsOk: Boolean = opponentCandidates.every((candidate) => {
      //  create a candidate game
       candidateGame.player_2 = {
          candidate: {...candidate},
          candidateColor: idealPlayingColor(candidate.lastTwoGamesColors)
       }
      if (candidateGame.player_1.candidateColor !== candidateGame.player_1.candidateColor) {
        // we have a valid game, get out of the every loop
        return false;
      }
      else {
        resultColor = alternatePlayingColor(candidateGame.player_1.candidate.lastTwoGamesColors)
        if (resultColor.ok) {
          // we have a valid game, get out of the every loop
          candidateGame.player_1.candidateColor = <COLOR>resultColor.val
          return false;
        }
      else {
          resultColor = alternatePlayingColor(candidateGame.player_2.candidate.lastTwoGamesColors)
          if (resultColor.ok) {
            // we have a valid game, get out of the every loop
            candidateGame.player_2.candidateColor = <COLOR>resultColor.val
            return false;
          }
          else {
            // keep looking for opponents
            return true
          }
        }
      }
    })
    if (!colorsOk) {
      //  We have to force an undesirable pairing. The lower ranked candidate gets the white pieces;
      candidateGame.player_2 = {
          candidate: {...opponentCandidates[0]},
          candidateColor: idealPlayingColor(opponentCandidates[0].lastTwoGamesColors)
      }
      if (candidateGame.player_1.candidateColor === WHITE_PIECES) {
        candidateGame.player_1.candidateColor = BLACK_PIECES
      }
      else {
        candidateGame.player_2.candidateColor = WHITE_PIECES
      }
    }

    // We have a candidateGame that can turn into a real game
    const gameReal: ITournamentGame = {
      id: shortid.generate(),
      whitePiecesPlayer: candidateGame.player_1.candidateColor === WHITE_PIECES ? {...candidateGame.player_1.candidate} : {...candidateGame.player_2.candidate},
      whitePiecesPlayerScore: TOURNAMENT_SCORE_LOSS,
      blackPiecesPlayer: candidateGame.player_1.candidateColor === BLACK_PIECES ? {...candidateGame.player_1.candidate} : {...candidateGame.player_2.candidate},
      blackPiecesPlayerScore: TOURNAMENT_SCORE_LOSS,
      status: STATUS_PLANNED
    }
    tournamentRound.games.push(gameReal)

    // remove the two players from workTournamentPlayers
    workTournamentPlayers = pruneWorkTournamentPlayers(workTournamentPlayers, candidateGame.player_1.candidate.id);
    workTournamentPlayers = pruneWorkTournamentPlayers(workTournamentPlayers, candidateGame.player_2.candidate.id);
  }

  // build the
  return tournamentRound;
}

export const findNextRoundToStart = (tournament: ITournament): Result<ITournamentRound, string> => {
  let nextRoundToStart: Result<ITournamentRound, string>;
  nextRoundToStart = Err(`round is not in planning state`);
  tournament.rounds.every((tr: ITournamentRound) => {
    if (tr.status === STATUS_PLANNED) {
      nextRoundToStart = Ok(tr);
      return false
    }
    else {
      nextRoundToStart = Err(`round is not in planning state`);
      return true
    }
  })
  return nextRoundToStart;
}

export const startRound = (tournament: ITournament): void => {

  const nextRoundToStart: Result<ITournamentRound, string> = findNextRoundToStart(tournament);
  let round: ITournamentRound;
  if (nextRoundToStart.err) {
    console.error(`Did not find a round in planning state`)
    process.exit(1)
  }
  round = <ITournamentRound>nextRoundToStart.val;
  round.games.forEach((game: ITournamentGame) => {
    if (game.blackPiecesPlayer.id !== TOURNAMENT_BYE_PLAYER.id ) {
      tournament.players.forEach((player: ITournamentPlayer) => {
        if (player.id === game.whitePiecesPlayer.id) {
          setUpPlayerGame(player, WHITE_PIECES, game.blackPiecesPlayer.id)
        }
        if (player.id === game.blackPiecesPlayer.id) {
          setUpPlayerGame(player,  BLACK_PIECES, game.whitePiecesPlayer.id)
       }
      });
      game.status = STATUS_UNDERWAY
    }
  });
  round.status = STATUS_UNDERWAY;
}
