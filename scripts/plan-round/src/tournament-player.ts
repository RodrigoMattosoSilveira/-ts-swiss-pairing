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

/**
 * Creates a new version of the tournamentPlayers array, sorted by the players' tournament sccore and club rating
 * @param tournamentPlayers
 * @returns version of the tournamentPlayers array, sorted by the players' tournament sccore and club rating
 */
export const buildWorkTournamentPlayers = (tournamentPlayers: ITournamentPlayer[]): ITournamentPlayer[] => {
  return tournamentPlayers.sort(
    (player_1, player_2) =>
      player_1.score - player_2.score || player_1.clubRating - player_2.clubRating
  )
}

/**
 * Removes the pruneMe element from the workTournamentPlayers array
 * @param workTournamentPlayers
 * @param pruneMe
 * @returns workTournamentPlayers, pruned of the pruneMe element
 */
export const pruneWorkTournamentPlayers = (workTournamentPlayers:ITournamentPlayer[], pruneMe:string): ITournamentPlayer[] => {
  return [...workTournamentPlayers].filter((player) => player.id !== pruneMe)
}

/**
 * Returns the tournament's lower ranked player, who will be a next round bye player
 * @param workTournamentPlayers
 * @return Result<ITournamentPlayer, Error>
 */
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

/**
 * Build a player's opponent candidates array.
 * Our goal is to pair high tournament scoring players, without pairing te strongest players with each other early;  we
 * also want to not include opponent candidates who have played with workTournamentPlayers[0]
 *
 * @param workTournamentPlayers
 * @returns opponentCandidates
 */
export const buildOpponentsCandidates = (workTournamentPlayers:ITournamentPlayer[]): ITournamentPlayer[] => {
  // sort by tournament score(desc) and club rating (desc)
  workTournamentPlayers.sort((player_1, player_2) =>
    player_2.score - player_1.score || player_2.clubRating - player_1.clubRating
  )
  const playerOneId: string = workTournamentPlayers[0].id;

  // Notice the concatenation of functions
  return [...workTournamentPlayers].
    // remove the player with highest tournament score and highest club rating
    slice(1).
    // sort by highest tournament score and lowest club rating
    sort(
      (player_1, player_2) =>
        player_2.score - player_1.score || player_1.clubRating - player_2.clubRating
    ).
    // remove the playes who played against the player with highest tournament score and highest club rating
    filter((thisPlayer) =>
    {
      return thisPlayer.opponents.indexOf(playerOneId) < 0
    })
}


