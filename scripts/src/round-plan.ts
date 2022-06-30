#!/usr/bin/env node

import {ITournamentRound, planRound} from "./modules/tournament-round";
import {ITournament, readTournament, saveTournament} from "./modules/tournament";
import {ITournamentPlayer} from "./modules/tournament-player";


// Parse tournament file name
const tournamentFn = "/Users/rodrigosilveira/projects/ts-swiss-pairing/scripts/data/updated/tournament.json"
console.log(`TournamentFn: ${tournamentFn}`);

// Parse tournament players
const tournament: ITournament = readTournament(<string>tournamentFn)
const tournamentPlayers: ITournamentPlayer[] = [...tournament.players]

// Plan and save the next round
const tournamentRound: ITournamentRound = planRound(tournamentPlayers)
tournament.rounds.push(tournamentRound)
saveTournament(<string>tournamentFn, tournament);
// console.log(util.inspect(tournamentRound.games, { compact: true, depth: 10, breakLength: 80 }));
