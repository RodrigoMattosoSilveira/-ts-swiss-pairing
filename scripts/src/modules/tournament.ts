import {ITournamentPlayer} from "./tournament-player";
import {STATUS} from "./status";
import {ITournamentRound} from "./tournament-round";
// import fs from "fs";
import * as fs from 'fs';

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
  id: string; // 8 chars, random string
  director: string; // Club Member ID
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
  rounds: ITournamentRound[];
  status: STATUS
}

export type TOURNAMENT_SCORE = number;
export const TOURNAMENT_SCORE_WIN: TOURNAMENT_SCORE = 3;
export const TOURNAMENT_SCORE_BYE: TOURNAMENT_SCORE = 3;
export const TOURNAMENT_SCORE_FORFEIT: TOURNAMENT_SCORE = 3;
export const TOURNAMENT_SCORE_DRAW: TOURNAMENT_SCORE = 1;
export const TOURNAMENT_SCORE_LOSS: TOURNAMENT_SCORE = 0;

export type ITournamentType = string;
export const TOURNAMENT_TYPE_SWISS: ITournamentType = "swiss"

// Read tournament
export const readTournament = (tournamentFn: string): ITournament => {
  let tournament: ITournament;
  let data: string = '';
  try {
    const fd = fs.openSync(tournamentFn, 'r', 0o666)
    data = fs.readFileSync(fd, { encoding: 'utf8' });
    fs.closeSync(fd);
  }
  catch (err) {
    console.log(err);
    process.exit(1)
  }
  tournament = JSON.parse(data)

  return tournament;
}

// Save tournament
export const saveTournament = (tournamentFn: string, newTournament: ITournament): void => {
  try {
    const fd = fs.openSync(tournamentFn, 'w+', 0o666)
    fs.writeSync(fd, JSON.stringify(newTournament));
    fs.closeSync(fd);
  }
  catch (err) {
    console.log(err);
  }
}


// Save tournament
export const saveRawTournament = (tournamentFn: string, newTournament: ITournament): void => {
  try {
    const fd = fs.openSync(tournamentFn, 'w+', 0o666)
    fs.writeSync(fd, JSON.stringify(newTournament));
    fs.closeSync(fd);
  }
  catch (err) {
    console.log(err);
  }
}
