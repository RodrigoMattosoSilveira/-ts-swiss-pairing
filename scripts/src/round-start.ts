#!/usr/bin/env node

import {startRound} from "./modules/tournament-round";
import {ITournament, readTournament, saveTournament} from "./modules/tournament";

// Parse tournament file name
const myArgs = process.argv.slice(2);
const tournamentFn = myArgs[0];
console.log(`TournamentFn: ${tournamentFn}`);

// Read the tournament
const tournament: ITournament = readTournament(<string>tournamentFn)

// start the current round
startRound(tournament);
saveTournament(<string>tournamentFn, tournament);

