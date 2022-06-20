import {ITournamentPlayer} from "./tournament-player";
import {ITournamentGame} from "./tournament-game";

/**
 * The landing page has a link for a Club Member to
 * - Crete a new tournament
 * - View planned, ongoing, and completed tournaments
 *
 * When a club member creates a tournament;
 * - The application sets the ITournament.director attribute to the IClubMember.id who created the tournament;
 * - The Club Member sets:
 *      - ITournament.name
 *      - ITournament.start and  ITournament.end dates,
 *      - ITournament.name
 *      - ITournament.maxPlayers
 *      - ITournament.type, swiss is the only option right now
 *      - ITournament.rounds
 *      - ITournament.winPoints, 3 is a default
 *      - ITournament.drawPoints, 1 is a default
 *      - ITournament.lossPoints, 0 is the default
 *  - The application sets
 *      - ITournament.players to an empty array
 *      - ITournament.rounds to an empty array
 *
 * - The ITournament.director can change the ITournament.director assignment;
 */

export type ITournament = {
  id: string;           // 8 chars, random string
  director: string;     // Club Member ID
  name: string;
  start: Date;
  end: Date;
  maxPlayers: number;
  type: string;
  numberOfRounds: number;
  winPoints: number;
  drawPoints: number;
  lossPoints: number;
  players: ITournamentPlayer[];
  rounds: ITournamentGame[][];
}
