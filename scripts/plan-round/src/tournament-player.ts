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
export let WorkTournamentPlayers: ITournamentPlayer[] = [];
export let OpponentCandidates: ITournamentPlayer[] = [];


