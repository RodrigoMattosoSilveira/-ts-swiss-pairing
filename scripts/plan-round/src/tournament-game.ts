import {ITournamentPlayer} from "./tournament-player";
import {STATUS} from "./status";
import {TOURNAMENT_SCORE} from "./tournament";

export type ITournamentGame = {
  id: string; // 8 chars, random string
  whitePiecesPlayer: ITournamentPlayer;
  whitePiecesPlayerScore: TOURNAMENT_SCORE;
  blackPiecesPlayer: ITournamentPlayer;
  blackPiecesPlayerScore: TOURNAMENT_SCORE;
  status: STATUS; // (p)lanned(default), (u)nderway, (c)ompleted
}

