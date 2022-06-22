import {ITournamentPlayer} from "./tournament-player";
import {STATUS} from "./status";
import {TOURNAMENT_SCORE} from "./tournament";

export type ITournamentGameReal = {
  id: string; // 8 chars, random string
  whitePiecesPlayer: ITournamentPlayer;
  whitePiecesPlayerScore: TOURNAMENT_SCORE;
  blackPiecesPlayer: ITournamentPlayer;
  blackPiecesPlayerScore: TOURNAMENT_SCORE;
  status: STATUS; // (p)lanned(default), (u)nderway, (c)ompleted
}

export type ITournamentGameBye  = {
  id: string; // 8 chars, random string
  byePlayer: ITournamentPlayer;
  byePlayerScore: TOURNAMENT_SCORE;
  status: STATUS; // (p)lanned(default), (u)nderway, (c)ompleted
}

export type ITournamentGameForfeit  = {
  id: string; // 8 chars, random string
  whitePiecesPlayer: ITournamentPlayer;
  whitePiecesPlayerScore: TOURNAMENT_SCORE;
  blackPiecesPlayer: ITournamentPlayer;
  blackPiecesPlayerScore: TOURNAMENT_SCORE;
  status: STATUS; // (p)lanned(default), (u)nderway, (c)ompleted
}

export type ITournamentGame = ITournamentGameReal | ITournamentGameBye | ITournamentGameForfeit;

