#!/usr/bin/env node

import {IClubMember} from "./modules/club-member";
import shortid = require("shortid");
import {ITournament, saveRawTournament, TOURNAMENT_TYPE_SWISS} from "./modules/tournament";
import {ITournamentPlayer} from "./modules/tournament-player";

const players: string[] = require("../data/raw/tournament-players.json");
const clubMembers: IClubMember[] = require("../data/raw/club-members.json");


const tournament: ITournament = {
  "id": shortid.generate(),
  "director": "b-qmCP1zORa",
  "name": "Cambridge-2022",
  "start": new Date("Fri Jul 01 2022 00:00:00 GMT-0700 (Pacific Daylight Time)"),
  "end": new Date("Mon Jul 04 2022 00:00:00 GMT-0700 (Pacific Daylight Time)"),
  "maxPlayers": 25,
  "type": TOURNAMENT_TYPE_SWISS,
  "numberOfRounds": 5,
  "winPoints": 3,
  "drawPoints": 1,
  "lossPoints": 0,
  "players": [],
  "rounds": [],
  "status": "p"
}

players.forEach((playerId: string) => {
  clubMembers.every((clubMember: IClubMember) => {
    if (clubMember.id === playerId) {
      const player: ITournamentPlayer = {
        id: clubMember.id,
        name: `${clubMember.last}, ${clubMember.first}`,
        score: 0,
        clubRating: clubMember.rating,
        opponents: [],
        lastTwoGamesColors: [],
        byeOrForfeit: 0
      }
      tournament.players.push(player);
      return false
    }
    else {
      return true
    }
  })

})

// Save the club members
saveRawTournament(`/Users/rodrigosilveira/projects/ts-swiss-pairing/scripts/data/raw/tournament.json`, tournament);
// // console.log(util.inspect(tournamentRound.games, { compact: true, depth: 10, breakLength: 80 }));
