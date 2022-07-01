#!/usr/bin/env node

import {getRoundUnderaway, ITournamentRound} from "./modules/tournament-round";
import {ITournament, readTournament, saveTournament} from "./modules/tournament";
import {ITournamentGame, setRoundGameResult} from "./modules/tournament-game";
import {
  getTheAnswer, HIGHER_RANKED_PLAYER_WINS,
  OddsBin
} from "./modules/simulate-game-results";

import {STATUS_COMPLETED} from "./modules/status";
import {ROUND_BYE_PLAYER} from "./modules/tournament-player";

// Parse tournament file name
const tournamentFn = "/Users/rodrigosilveira/projects/ts-swiss-pairing/scripts/data/updated/tournament.json"
console.log(`TournamentFn: ${tournamentFn}`);

// Parse tournament players & games
const tournament: ITournament = readTournament(<string>tournamentFn)
const roundUnderaway: ITournamentRound = getRoundUnderaway(tournament)
const roundUnderawayGames: ITournamentGame[] = [...roundUnderaway.games]
roundUnderawayGames.forEach((game) => {
  let result: string = "";
  let oddsBins: OddsBin[] = [];
  if (game.blackPiecesPlayer.id === ROUND_BYE_PLAYER.id) {
    result = HIGHER_RANKED_PLAYER_WINS
    console.log(`oddsBins: bye game`);
  }
  else {
    const wppRanking: number = game.whitePiecesPlayer.clubRating
    const bppRanking: number = game.whitePiecesPlayer.clubRating
    oddsBins = getTheAnswer(Math.min(wppRanking, bppRanking), Math.max(wppRanking, bppRanking));
    const random: number = Math.random();
    oddsBins.every((oddsbin: OddsBin) => {
      if (random <= oddsbin.binValue) {
        // console.log(`outcome : ` + oddsbin.binOutcome);
        result = oddsbin.binOutcome
        return false
      } else {
        return true
      }
    });
    console.log(`oddsBins: ${oddsBins[0].binValue},  ${oddsBins[1].binValue},  ${oddsBins[2].binValue}`);
  }
  game = setRoundGameResult(game, result, tournament.winPoints,  tournament.drawPoints, tournament.lossPoints)
  game.status = STATUS_COMPLETED
  console.log(`game ${game.id} result: ${result}`)
})
roundUnderaway.status = STATUS_COMPLETED;
saveTournament(<string>tournamentFn, tournament);
