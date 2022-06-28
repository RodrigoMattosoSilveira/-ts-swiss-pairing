#!/usr/bin/env node

import {ITournamentRound, planRound, startRound} from "./modules/tournament-round";
import {ITournament, readTournament, saveTournament} from "./modules/tournament";


// Parse tournament file name
const myArgs = process.argv.slice(2);
const tournamentFn = myArgs[0];
console.log(`TournamentFn: ${tournamentFn}`);

// Parse tournament players
const tournament: ITournament = readTournament(<string>tournamentFn)

// Plan and save the next round
startRound(tournament);
const tournamentRound: ITournamentRound = planRound(tournament.players)
tournament.rounds.push(tournamentRound)
saveTournament(<string>tournamentFn, tournament);
// console.log(util.inspect(tournamentRound.games, { compact: true, depth: 10, breakLength: 80 }));
