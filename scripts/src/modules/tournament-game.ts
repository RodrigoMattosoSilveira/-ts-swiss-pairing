import {ITournamentPlayer} from "./tournament-player";
import {STATUS} from "./status";
import {TOURNAMENT_SCORE} from "./tournament";
import {HIGHER_RANKED_PLAYER_WINS, LOWER_RANKED_PLAYER_DRAWS, LOWER_RANKED_PLAYER_WINS} from "./simulate-game-results";

export type ITournamentGame = {
  id: string; // 8 chars, random string
  whitePiecesPlayer: ITournamentPlayer;
  whitePiecesPlayerScore: TOURNAMENT_SCORE;
  blackPiecesPlayer: ITournamentPlayer;
  blackPiecesPlayerScore: TOURNAMENT_SCORE;
  status: STATUS; // (p)lanned(default), (u)nderway, (c)ompleted
}

export const orderPlayersByRank = (game: ITournamentGame): ITournamentPlayer[] => {
  const playersByRank: ITournamentPlayer[] = [];
  playersByRank.push(game.whitePiecesPlayer, game.blackPiecesPlayer);
  playersByRank.sort((player_1, player_2) => {
    return player_1.score - player_2.score || player_1.clubRating - player_2.clubRating;
  })
  return playersByRank;
}
export const setRoundGameResult = (game: ITournamentGame, result: string, winPoints: number, drawPoints: number, lossPoints: number): ITournamentGame => {
  const playersByRank: ITournamentPlayer[] = orderPlayersByRank(game);
  switch (result) {
    case LOWER_RANKED_PLAYER_WINS:
      playersByRank[0].score += winPoints
      playersByRank[1].score += lossPoints
      break;
    case LOWER_RANKED_PLAYER_DRAWS:
      playersByRank[0].score += drawPoints;
      playersByRank[1].score += drawPoints;
      break;
    case HIGHER_RANKED_PLAYER_WINS:
      playersByRank[0].score += lossPoints
      playersByRank[1].score += winPoints
      break;
    default:
      console.log(`Invalid game outcome : ${result}`);
      process.exit(1)
      break;
  }
  return game;
}
