import {ITournamentGame, orderPlayersByRank, setRoundGameResult} from "./tournament-game";
import {ITournamentPlayer} from "./tournament-player";
import {STATUS_UNDERWAY} from "./status";
import {HIGHER_RANKED_PLAYER_WINS, LOWER_RANKED_PLAYER_DRAWS, LOWER_RANKED_PLAYER_WINS} from "./simulate-game-results";

describe(`tournament Game`, () => {
  describe(`record game results`, () => {
    it(`sorts players by ranking`, async done => {
      const game: ITournamentGame = {
        "id": "6v7rGPopMm",
        "whitePiecesPlayer":{
          "id": "qKv8bJIlp0",
          "name": "Maddox, Sophia",
          "score": 0,
          "clubRating": 1685,
          "opponents": ["GA4MJdeV7C"],
          "lastTwoGamesColors": ["b"],
          "byeOrForfeit": 0
        },
        "whitePiecesPlayerScore": 0,
        "blackPiecesPlayer":{
          "id": "GA4MJdeV7C",
          "name": "Delacruz, Ivy",
          "score": 0,
          "clubRating": 1698,
          "opponents": ["qKv8bJIlp0"],
          "lastTwoGamesColors": ["w"],
          "byeOrForfeit": 0
        },
        "blackPiecesPlayerScore": 0,
        "status": STATUS_UNDERWAY
      }
      const playersByRank: ITournamentPlayer[] = orderPlayersByRank(game);
      expect(playersByRank[0].id).toEqual("qKv8bJIlp0")
      expect(playersByRank[1].id).toEqual("GA4MJdeV7C")
      done();
    })
    it(`higher ranked player wins`, async done => {
      let game: ITournamentGame = {
        "id": "6v7rGPopMm",
        "whitePiecesPlayer":{
          "id": "qKv8bJIlp0",
          "name": "Maddox, Sophia",
          "score": 0,
          "clubRating": 1685,
          "opponents": ["GA4MJdeV7C"],
          "lastTwoGamesColors": ["b"],
          "byeOrForfeit": 0
        },
        "whitePiecesPlayerScore": 0,
        "blackPiecesPlayer":{
          "id": "GA4MJdeV7C",
          "name": "Delacruz, Ivy",
          "score": 0,
          "clubRating": 1698,
          "opponents": ["qKv8bJIlp0"],
          "lastTwoGamesColors": ["w"],
          "byeOrForfeit": 0
        },
        "blackPiecesPlayerScore": 0,
        "status": STATUS_UNDERWAY
      }
      game = setRoundGameResult(game, HIGHER_RANKED_PLAYER_WINS, 3, 1, 0)
      expect(game.whitePiecesPlayer.score).toEqual(0)
      expect(game.blackPiecesPlayer.score).toEqual(3)
      done();
    });
    it(`lower ranked player draws`, async done => {
      let game: ITournamentGame = {
        "id": "6v7rGPopMm",
        "whitePiecesPlayer":{
          "id": "qKv8bJIlp0",
          "name": "Maddox, Sophia",
          "score": 0,
          "clubRating": 1685,
          "opponents": ["GA4MJdeV7C"],
          "lastTwoGamesColors": ["b"],
          "byeOrForfeit": 0
        },
        "whitePiecesPlayerScore": 0,
        "blackPiecesPlayer":{
          "id": "GA4MJdeV7C",
          "name": "Delacruz, Ivy",
          "score": 0,
          "clubRating": 1698,
          "opponents": ["qKv8bJIlp0"],
          "lastTwoGamesColors": ["w"],
          "byeOrForfeit": 0
        },
        "blackPiecesPlayerScore": 0,
        "status": STATUS_UNDERWAY
      }
      game = setRoundGameResult(game, LOWER_RANKED_PLAYER_DRAWS, 3, 1, 0)
      expect(game.whitePiecesPlayer.score).toEqual(1)
      expect(game.blackPiecesPlayer.score).toEqual(1)
      done();
    });
    it(`lower ranked player draws`, async done => {
      let game: ITournamentGame = {
        "id": "6v7rGPopMm",
        "whitePiecesPlayer":{
          "id": "qKv8bJIlp0",
          "name": "Maddox, Sophia",
          "score": 0,
          "clubRating": 1685,
          "opponents": ["GA4MJdeV7C"],
          "lastTwoGamesColors": ["b"],
          "byeOrForfeit": 0
        },
        "whitePiecesPlayerScore": 0,
        "blackPiecesPlayer":{
          "id": "GA4MJdeV7C",
          "name": "Delacruz, Ivy",
          "score": 0,
          "clubRating": 1698,
          "opponents": ["qKv8bJIlp0"],
          "lastTwoGamesColors": ["w"],
          "byeOrForfeit": 0
        },
        "blackPiecesPlayerScore": 0,
        "status": STATUS_UNDERWAY
      }
      game = setRoundGameResult(game, LOWER_RANKED_PLAYER_WINS, 3, 1, 0)
      expect(game.whitePiecesPlayer.score).toEqual(3)
      expect(game.blackPiecesPlayer.score).toEqual(0)
      done();
    });
  });
})
