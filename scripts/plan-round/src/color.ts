export type COLOR = string;
export const BLACK_PIECES = "b"
export const WHITE_PIECES = "w"

export const reverseColor = (color: COLOR):COLOR => color === BLACK_PIECES ? WHITE_PIECES : BLACK_PIECES;
