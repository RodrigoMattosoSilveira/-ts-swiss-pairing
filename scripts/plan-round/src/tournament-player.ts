/**
 * When a Club Member enters a tournament, the application sets:
 * - ITournamentPlayer.id to the ClubMember.id;
 * - ITournamentPlayer.name to the string consisting of the club member IClubMember.Last + "," IClubMember.first;
 * - ITournamentPlayer.rate to the IClubMemberT.rate;
 *
 * When the Tournament Director creates a TournamentT.round, the application, for each game and player:
 * - pushes the player's game pieces color into the TournamentT.gamesPiecesColors array;
 *   - a player who earned  a bye round gets the white pieces;
 * - Appends the IClubMember.id of each players' opponents to their ITournamentPlayer.opponents array;
 *
 * When the Tournament Director closes a ITournament.Game, the application:
 * - Adds the TournamentT.winPoints or drawPoints, to each players ITournamentPlayer.score, based on the game result;
 */
import { Ok, Err, Result } from 'ts-results';

export type ITournamentPlayer = {
  id: string; // Club Member Id
  name: string; // Last, First
  score: number // tournament score, updated after each game
  clubRating: number; // club rate, set at the start of the tournament
  opponents: string[];
  lastTwoGamesColors: string[] // last two game colors
}

export const buildWorkTournamentPlayers = (tournamentPlayers: ITournamentPlayer[]): ITournamentPlayer[] => {
  return tournamentPlayers.sort(
    (player_1, player_2) =>
      player_1.score - player_2.score || player_1.clubRating - player_2.clubRating
  )
}

export const getByePlayer = (workTournamentPlayers: ITournamentPlayer[]): Result<ITournamentPlayer, Error>  => {
  let result: Result<ITournamentPlayer, Error>;
  if (workTournamentPlayers.length % 2 === 0) {
    result = Err(new Error(`workTournamentPlayers length is even, no bye player`))
  }
  else {
    result = Ok({...workTournamentPlayers[0]})
  }
  return result;
}


