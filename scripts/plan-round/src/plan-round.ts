#!/usr/bin/env node

import {ITournamentRound, planRound} from "./tournament-round";
import {ITournament, readTournament, saveTournament} from "./tournament";
import {ITournamentPlayer} from "./tournament-player";


// Parse tournament file name
const myArgs = process.argv.slice(2);
const tournamentFn = myArgs[0];
console.log(`TournamentFn: ${tournamentFn}`);

// Parse tournament players
const tournament: ITournament = readTournament(<string>tournamentFn)
const tournamentPlayers: ITournamentPlayer[] = [...tournament.players]

// Plan and save the next round
const tournamentRound: ITournamentRound = planRound(tournamentPlayers)
tournament.rounds.push(tournamentRound)
saveTournament(<string>tournamentFn, tournament);
// console.log(util.inspect(tournamentRound.games, { compact: true, depth: 10, breakLength: 80 }));
