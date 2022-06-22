export type COLOR = string;
export const BLACK_PIECES = "b"
export const WHITE_PIECES = "w"
export const NO_COLOR = "n"

export const reverseColor = (color: COLOR):COLOR => color === BLACK_PIECES ? WHITE_PIECES : BLACK_PIECES;
