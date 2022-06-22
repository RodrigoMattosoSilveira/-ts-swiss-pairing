import {alternatePlayingColor, ICandidatePlayer, idealPlayingColor} from "./candidate-player";
import {BLACK_PIECES, COLOR, WHITE_PIECES} from "./color";
import {Result} from "ts-results";

describe(`Candidate Player`, () => {
  describe(`idealPlayingColor`, () => {
    it(`lastTwoGamesColors is empty`, async done => {
      const candidatePlayer: ICandidatePlayer = {
        candidate: {
          "id":"wMIO8kdJi","name":"Hodge, Adeline","clubRating":2043,"lastTwoGamesColors":[],"opponents":[],"score":0
        },
        candidateColor: "x"
      }
      expect(idealPlayingColor(candidatePlayer.candidate.lastTwoGamesColors)).toEqual(WHITE_PIECES)
      done();
    })
    it(`lastTwoGamesColors has one entry, WHITE_PIECES`, async done => {
      const candidatePlayer: ICandidatePlayer = {
        candidate: {
          "id":"wMIO8kdJi","name":"Hodge, Adeline","clubRating":2043,"lastTwoGamesColors":[WHITE_PIECES],"opponents":[],"score":0
        },
        candidateColor: "x"
      }
      expect(idealPlayingColor(candidatePlayer.candidate.lastTwoGamesColors)).toEqual(BLACK_PIECES)
      done();
    })
    it(`lastTwoGamesColors has one entry, BLACK_PIECES`, async done => {
      const candidatePlayer: ICandidatePlayer = {
        candidate: {
          "id":"wMIO8kdJi","name":"Hodge, Adeline","clubRating":2043,"lastTwoGamesColors":[BLACK_PIECES],"opponents":[],"score":0
        },
        candidateColor: "x"
      }
      expect(idealPlayingColor(candidatePlayer.candidate.lastTwoGamesColors)).toEqual(WHITE_PIECES)
      done();
    })
  });
  describe(`alternatePlayingColor`, () => {
    it(`lastTwoGamesColors has no entries`, async done => {
      const candidatePlayer: ICandidatePlayer = {
        candidate: {
          "id":"wMIO8kdJi","name":"Hodge, Adeline","clubRating":2043,"lastTwoGamesColors":[],"opponents":[],"score":0
        },
        candidateColor: "x"
      }
      let result: Result<COLOR, string> = alternatePlayingColor(candidatePlayer.candidate.lastTwoGamesColors);
      expect(result.err).toBeTruthy()
      expect(result.val).toEqual(`Player's lastTwoGamesColors array must have 2, and only 2, elements: 0`)
      done();
    })
    it(`lastTwoGamesColors has one entry`, async done => {
      const candidatePlayer: ICandidatePlayer = {
        candidate: {
          "id":"wMIO8kdJi","name":"Hodge, Adeline","clubRating":2043,"lastTwoGamesColors":[BLACK_PIECES],"opponents":[],"score":0
        },
        candidateColor: "x"
      }
      let result: Result<COLOR, string> = alternatePlayingColor(candidatePlayer.candidate.lastTwoGamesColors);
      expect(result.err).toBeTruthy()
      expect(result.val).toEqual(`Player's lastTwoGamesColors array must have 2, and only 2, elements: 1`)
      done();
    })
    it(`lastTwoGamesColors has 3 entries`, async done => {
      const candidatePlayer: ICandidatePlayer = {
        candidate: {
          "id":"wMIO8kdJi","name":"Hodge, Adeline","clubRating":2043,"lastTwoGamesColors":[BLACK_PIECES, BLACK_PIECES, BLACK_PIECES],"opponents":[],"score":0
        },
        candidateColor: "x"
      }
      let result: Result<COLOR, string> = alternatePlayingColor(candidatePlayer.candidate.lastTwoGamesColors);
      expect(result.err).toBeTruthy()
      expect(result.val).toEqual(`Player's lastTwoGamesColors array must have 2, and only 2, elements: 3`)
      done();
    });
    it(`lastTwoGamesColors has 2 entries, White/White`, async done => {
      const candidatePlayer: ICandidatePlayer = {
        candidate: {
          "id":"wMIO8kdJi","name":"Hodge, Adeline","clubRating":2043,"lastTwoGamesColors":[WHITE_PIECES, WHITE_PIECES],"opponents":[],"score":0
        },
        candidateColor: "x"
      }
      let result: Result<COLOR, string> = alternatePlayingColor(candidatePlayer.candidate.lastTwoGamesColors);
      expect(result.err).toBeTruthy()
      expect(result.val).toEqual(`Unable to select alternatePlayingColor`)
      done();
    });
    it(`lastTwoGamesColors has 2 entries, White/Black`, async done => {
      const candidatePlayer: ICandidatePlayer = {
        candidate: {
          "id":"wMIO8kdJi","name":"Hodge, Adeline","clubRating":2043,"lastTwoGamesColors":[WHITE_PIECES, BLACK_PIECES],"opponents":[],"score":0
        },
        candidateColor: "x"
      }
      let result: Result<COLOR, string> = alternatePlayingColor(candidatePlayer.candidate.lastTwoGamesColors);
      expect(result.ok).toBeTruthy()
      expect(result.val).toEqual(BLACK_PIECES)
      done();
    });
    it(`lastTwoGamesColors has 2 entries, Black/White`, async done => {
      const candidatePlayer: ICandidatePlayer = {
        candidate: {
          "id":"wMIO8kdJi","name":"Hodge, Adeline","clubRating":2043,"lastTwoGamesColors":[BLACK_PIECES, WHITE_PIECES],"opponents":[],"score":0
        },
        candidateColor: "x"
      }
      let result: Result<COLOR, string> = alternatePlayingColor(candidatePlayer.candidate.lastTwoGamesColors);
      expect(result.ok).toBeTruthy()
      expect(result.val).toEqual(WHITE_PIECES)
      done();
    });
    it(`lastTwoGamesColors has 2 entries, Black/Black`, async done => {
      const candidatePlayer: ICandidatePlayer = {
        candidate: {
          "id":"wMIO8kdJi","name":"Hodge, Adeline","clubRating":2043,"lastTwoGamesColors":[BLACK_PIECES, BLACK_PIECES],"opponents":[],"score":0
        },
        candidateColor: "x"
      }
      let result: Result<COLOR, string> = alternatePlayingColor(candidatePlayer.candidate.lastTwoGamesColors);
      expect(result.err).toBeTruthy()
      expect(result.val).toEqual(`Unable to select alternatePlayingColor`)
      done();
    })
  });
})
