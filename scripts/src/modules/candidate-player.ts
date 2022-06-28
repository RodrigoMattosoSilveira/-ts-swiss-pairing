import {ITournamentPlayer} from "./tournament-player";
import {COLOR, reverseColor, WHITE_PIECES} from "./color";
import {Err, Ok, Result} from "ts-results";

export type ICandidatePlayer = {
  candidate: ITournamentPlayer;
  candidateColor: COLOR; // candidate color
}

export const idealPlayingColor = (lastTwoGamesColors: COLOR[]): COLOR => {
  return lastTwoGamesColors.length === 0 ? WHITE_PIECES :
    lastTwoGamesColors.length === 1 ? reverseColor(lastTwoGamesColors[0]) :
      reverseColor(lastTwoGamesColors[1])
}

export const alternatePlayingColor = (lastTwoGamesColors: COLOR[]): Result<COLOR, string> => {
  let result: Result<COLOR, string>;
  if (lastTwoGamesColors.length !== 2) {
    result = new Err(`Player's lastTwoGamesColors array must have 2, and only 2, elements: ${lastTwoGamesColors.length}`);
  }
  else {
    result = lastTwoGamesColors[1] !== lastTwoGamesColors[0] ?
      new Ok(lastTwoGamesColors[1]) :
      new Err(`Unable to select alternatePlayingColor`);
  }

  return result;
}
