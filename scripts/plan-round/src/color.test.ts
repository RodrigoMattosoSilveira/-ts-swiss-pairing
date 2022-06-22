import {BLACK_PIECES, reverseColor, WHITE_PIECES} from "./color";

describe(`reverse color`, () => {
  it(`white to black pieces`, async done => {
    expect(reverseColor(WHITE_PIECES)).toEqual(BLACK_PIECES)
    done();
  });
  it(`black to white pieces`, async done => {
    expect(reverseColor(BLACK_PIECES)).toEqual(WHITE_PIECES)
    done();
  });
})
