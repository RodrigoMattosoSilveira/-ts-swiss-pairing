import {
  ITournamentPlayer,
  buildWorkTournamentPlayers,
  getByePlayer,
  pruneWorkTournamentPlayers,
  buildOpponentsCandidates
} from "./tournament-player";
import {Result} from "ts-results";

describe(`tournament Player`, () => {
  let tournamentPlayers: ITournamentPlayer[] = []
  beforeEach(async done => {
    tournamentPlayers = [
      {"id":"wMIO8kdJi","name":"Hodge, Adeline","clubRating":2043,"lastTwoGamesColors":[],"opponents":[],"score":0},
      {"id":"7Sf0CcAaoz","name":"Lowe, Maryjane","clubRating":1544,"lastTwoGamesColors":[],"opponents":[],"score":0},
      {"id":"0AwPRm82Le","name":"Dorsey, Brett","clubRating":1957,"lastTwoGamesColors":[],"opponents":[],"score":0},
      {"id":"5udxzNEpIu","name":"Moody, Arianna","clubRating":1026,"lastTwoGamesColors":[],"opponents":[],"score":0},
      {"id":"pPiXT9EJ1C","name":"Stuart, Reuben","clubRating":1945,"lastTwoGamesColors":[],"opponents":[],"score":0},
      {"id":"ofP1VHpOGW","name":"Snow, Saniya","clubRating":1705,"lastTwoGamesColors":[],"opponents":[],"score":0},
      {"id":"hQuf6bERqH","name":"Mcguire, Tristan","clubRating":1584,"lastTwoGamesColors":[],"opponents":[],"score":0},
      {"id":"uT6akMHdPf","name":"Osborn, Norah","clubRating":2039,"lastTwoGamesColors":[],"opponents":[],"score":0},
      {"id":"PWyP6-21cX","name":"Solomon, Moses","clubRating":1073,"lastTwoGamesColors":[],"opponents":[],"score":0},
      {"id":"_qzhuNqMqn","name":"Valdez, Joslyn","clubRating":1909,"lastTwoGamesColors":[],"opponents":[],"score":0},
      {"id":"VlXqLDxUN9","name":"Todd, Makai","clubRating":1608,"lastTwoGamesColors":[],"opponents":[],"score":0},
      {"id":"eHQmmc9VAB","name":"Barajas, Emilio","clubRating":1146,"lastTwoGamesColors":[],"opponents":[],"score":0},
      {"id":"6b4Pb8NV3i","name":"Kerr, Aaron","clubRating":1740,"lastTwoGamesColors":[],"opponents":[],"score":0},
      {"id":"b1ONc6PJP6","name":"Harrell, Demarion","clubRating":1859,"lastTwoGamesColors":[],"opponents":[],"score":0},
      {"id":"KPmlmxHY72","name":"Maddox, Sophia","clubRating":1685,"lastTwoGamesColors":[],"opponents":[],"score":0},
      {"id":"v5VDWM8815","name":"Delacruz, Ivy","clubRating":1698,"lastTwoGamesColors":[],"opponents":[],"score":0},
      {"id":"UnAsLvVwhkd","name":"Huynh, Kristian","clubRating":1205,"lastTwoGamesColors":[],"opponents":[],"score":0},
      {"id":"-i5XjpvwF4j","name":"Massey, Abbie","clubRating":1131,"lastTwoGamesColors":[],"opponents":[],"score":0},
      {"id":"FfOZDBM6mIt","name":"Woodward, Emilie","clubRating":1669,"lastTwoGamesColors":[],"opponents":[],"score":0},
      {"id":"sK7ae1F9crG","name":"Hobbs, Jarrett","clubRating":1788,"lastTwoGamesColors":[],"opponents":[],"score":0},
      {"id":"zV5quEifuR-","name":"Schmitt, Amani","clubRating":1884,"lastTwoGamesColors":[],"opponents":[],"score":0},
      {"id":"1tiN6IHrL2Y","name":"Henson, Shayla","clubRating":1309,"lastTwoGamesColors":[],"opponents":[],"score":0},
      {"id":"PsI5PH1s22x","name":"Mcclain, Brenna","clubRating":1008,"lastTwoGamesColors":[],"opponents":[],"score":0},
      {"id":"xF5H9yWm_bX","name":"Wells, Kendrick","clubRating":1280,"lastTwoGamesColors":[],"opponents":[],"score":0},
      {"id":"BhUQzSfXhzz","name":"Hoffman, Ansley","clubRating":1278,"lastTwoGamesColors":[],"opponents":[],"score":0}
    ];
    done();
  });
  describe(`workTournamentPlayers`, () => {
    it(`Created the workTournamentPlayers array correctly`, async done => {
      const workTournamentPlayers: ITournamentPlayer[] = buildWorkTournamentPlayers(tournamentPlayers);
      expect(workTournamentPlayers[0].id).toEqual("PsI5PH1s22x");
      done();
    });
    it(`get bye player from odd sized array`, async done => {
      const workTournamentPlayers: ITournamentPlayer[] = buildWorkTournamentPlayers(tournamentPlayers);
      let result: Result<ITournamentPlayer, Error> = getByePlayer(workTournamentPlayers);
      expect(result.ok).toBeTruthy()
      if (result.ok) {
        const byePlayer: ITournamentPlayer | Error = result.val
        expect(byePlayer.id).toEqual("PsI5PH1s22x");
      }
      done();
    });
    it(`get bye player from even sized array`, async done => {
      const workTournamentPlayers: ITournamentPlayer[] = buildWorkTournamentPlayers(tournamentPlayers).slice(1);
      let result: Result<ITournamentPlayer, Error> = getByePlayer(workTournamentPlayers);
      expect(result.err).toBeTruthy()
      if (result.err) {
        const byePlayer: string = result.val.message
        expect(byePlayer).toEqual(`workTournamentPlayers length is even, no bye player`);
      }
      done();
    });
    it(`prunes the workTournamentPlayers array`, async done => {
      const workTournamentPlayers: ITournamentPlayer[] = buildWorkTournamentPlayers(tournamentPlayers);
      let pruneMe: string = "UnAsLvVwhkd";

      // collect the players' ids in workTournamentPlayers
      const workTournamentPlayersIDs: string[] = [];
      workTournamentPlayers.forEach((player) => workTournamentPlayersIDs.push(player.id))

      // prune workTournamentPlayers of the pruneMe player.id
      const prunedWorkTournamentPlayers: ITournamentPlayer[] = pruneWorkTournamentPlayers(workTournamentPlayers,pruneMe);

      // collect the players' ids in workTournamentPlayers
      const prunedWorkTournamentPlayersIds: string[] = [];
      prunedWorkTournamentPlayers.forEach((player) => prunedWorkTournamentPlayersIds.push(player.id));

      // Find the elements of workTournamentPlayersIDs thare are not in prunedWorkTournamentPlayersIds
      // Comparing arraays: https://stackoverflow.com/questions/38498258/typescript-difference-between-two-arrays
      let missingIds: string[] = workTournamentPlayersIDs.filter(id => prunedWorkTournamentPlayersIds.indexOf(id) < 0);
      expect(missingIds.length).toEqual(1);
      expect(missingIds[0]).toEqual("UnAsLvVwhkd");

      missingIds = prunedWorkTournamentPlayersIds.filter(id => workTournamentPlayersIDs.indexOf(id) < 0);
      expect(missingIds.length).toEqual(0);

      done();
    });
    describe(` opponent candidates array`, () => {

      it(`builds correctly after first round, first player`, async done => {
        const opponentCandidates: ITournamentPlayer[] = buildOpponentsCandidates(tournamentPlayers)
        expect(opponentCandidates.length).toEqual(24)
        expect(opponentCandidates[0].id).toEqual("PsI5PH1s22x")
        expect(opponentCandidates[10].id).toEqual("hQuf6bERqH")
        expect(opponentCandidates[23].id).toEqual("uT6akMHdPf")
        done();
      });
      it(`builds correctly with third round, first place player`, async done => {
        const workTournamentPlayers: ITournamentPlayer[] = [...tournamentPlayers];
        workTournamentPlayers[0].score = 2
        workTournamentPlayers[1].score = 2
        workTournamentPlayers[2].score = 2
        workTournamentPlayers[3].score = 0
        workTournamentPlayers[4].score = 1
        workTournamentPlayers[5].score = 3
        workTournamentPlayers[6].score = 3
        workTournamentPlayers[7].score = 0
        workTournamentPlayers[8].score = 0
        workTournamentPlayers[9].score = 0
        workTournamentPlayers[10].score = 0
        workTournamentPlayers[11].score = 4
        workTournamentPlayers[12].score = 4
        workTournamentPlayers[13].score = 5
        workTournamentPlayers[14].score = 5
        workTournamentPlayers[15].score = 6
        workTournamentPlayers[16].score = 0
        workTournamentPlayers[17].score = 0
        workTournamentPlayers[18].score = 3
        workTournamentPlayers[19].score = 1
        workTournamentPlayers[20].score = 5
        workTournamentPlayers[21].score = 6
        workTournamentPlayers[22].score = 9
        workTournamentPlayers[23].score = 7
        workTournamentPlayers[24].score = 7
        const opponentCandidates: ITournamentPlayer[] = buildOpponentsCandidates(workTournamentPlayers)
        expect(opponentCandidates.length).toEqual(24)
        expect(opponentCandidates[0].id).toEqual("BhUQzSfXhzz")
        expect(opponentCandidates[10].id).toEqual("FfOZDBM6mIt")
        expect(opponentCandidates[23].id).toEqual("uT6akMHdPf")
        done();
      });
    });
  })
})
