#!/usr/bin/env node

import {IClubMember, saveClubMembers} from "./modules/club-member";
import shortid = require("shortid");

type IPeople = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rating: number;
}
const people: IPeople[] = require("../data/raw/people.json");
// console.log(`people: ${JSON.stringify(people)}`);
const phones: string[] = require("../data/raw/phone-numbers.json");
// console.log(`phones: ${JSON.stringify(phones)}`);

const clubMember: IClubMember[] = [];
people.forEach((person: IPeople) => {
  let i = 0;
  const cMember: IClubMember = {
    id: shortid.generate(),
    first: person.firstName,
    last: person.lastName,
    email: person.email,
    password: person.password,
    cell: phones[i++],
    rating: person.rating,
    status: true
  }
  clubMember.push(cMember)
})

// Save the club members
saveClubMembers(clubMember);
// // console.log(util.inspect(tournamentRound.games, { compact: true, depth: 10, breakLength: 80 }));
