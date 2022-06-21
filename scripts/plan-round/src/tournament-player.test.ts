import {ITournamentPlayer, buildWorkTournamentPlayers} from "./tournament-player";

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
  it(`Created the workTournamentPlayers array correctly`, async done => {
    const workTournamentPlayers: ITournamentPlayer[] = buildWorkTournamentPlayers(tournamentPlayers);
    expect(workTournamentPlayers[0].id).toEqual("PsI5PH1s22x");
    done();
  });
})