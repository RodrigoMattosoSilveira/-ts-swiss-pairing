import {ITournamentPlayer} from "./tournament-player";
import {COLOR, reverseColor, WHITE_PIECES} from "./color";
import {Err, Ok, Result} from "ts-results";

export type ICandidatePlayer = {
  player: ITournamentPlayer;
  candidateColor: string; // candidate color
}

export const idealPlayingColor = (candidatePlayer: ICandidatePlayer): COLOR => {
  return candidatePlayer.player.lastTwoGamesColors.length === 0 ? WHITE_PIECES :
    candidatePlayer.player.lastTwoGamesColors.length === 1 ? reverseColor(candidatePlayer.player.lastTwoGamesColors[0]) :
      reverseColor(candidatePlayer.player.lastTwoGamesColors[1])
}

export const alternatePlayingColor = (candidatePlayer: ICandidatePlayer): Result<COLOR, string> => {
  let result: Result<COLOR, string>;
  if (candidatePlayer.player.lastTwoGamesColors.length !== 2) {
    result = new Err(`Player's lastTwoGamesColors array must have 2, and only 2, elements: ${candidatePlayer.player.lastTwoGamesColors.length}`);
  }
  else {
    result = candidatePlayer.player.lastTwoGamesColors[1] !== candidatePlayer.player.lastTwoGamesColors[0] ?
      new Ok(candidatePlayer.player.lastTwoGamesColors[1]) :
      new Err(`Unable to select alternatePlayingColor`);
  }

  return result;
}
