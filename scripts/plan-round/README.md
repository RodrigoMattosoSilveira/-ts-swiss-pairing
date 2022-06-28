# Introduction
Built using the [TypeScript Boilerplate for 2021 as template](https://github.com/metachris/typescript-boilerplate)

# Glossary
Glossary
1. **Last Two Games Colors** - A helper data structure used to select a player's next game pieces color;
3. **Opponent Candidates** - An `Tournament Player` array; see data structures below for details;
5. **Opponent Candidate** - A `Tournament Player`, selected from the `Opponent Candidates` array under consideration to play against a `Candidate Game Player`;
6. **Player_1** - A `player`, selected from the `Work Tournament Players` array;
7. **Player_2** - A `player`, selected from the `Opponent Candidates` array;
8. **Tournament Rank** - aka rank, a `player`'s tournament score (desc) and club rating (desc);
9. **Round Bye Player** - A `player`, selected from `Work Tournament Players`, that does not play on a given `Tournament Round` to render the number of round players even;
10. **Tournament Player** - A `Club Member` that signed up for a `Tournament`, aka `player`;
11. **Tournament players** - The array of `Tournament players`;
12. **Tournament Rank** - Also, `rank`, a sorting key consisting of the `player's` current `Tournament Score` and their `Club Rating` at the start of the `Tournament`; we use the later to break ties;
13. **Tournament Round** - A collection of games planned as part of a given round;
14. **Work Tournament Players** - A copy of the `Tournament Players` array, sorted by `rank`; then pruned of players as we assign them to games;

# Data Structures
## Last Two Games Colors
This is 2-entries string array describing a `player's` last two games' pieces colors, and used to select the `player's` next game pieces color:
### Created
1. Created with the `Tournament Player`, as an empty string array;
### Updates
1. Updated whenever the `Tournament Director` starts a `Tournament Round`;
2. If its length is zero, set its first entry to the opposite of the player's game's pieces color;
3. Append the player's game pieces color;
4. If its length is 3, remove the first entry;
### Selecting a player's next game pieces color
#### Ideal color
1. Select the opposite of the entry at index 1;
#### Acceptable color; returns a Result("string", "no acceptable colors available")
1. If entry at index 0 not match the entry at index 1, return Result.ok(color at index 1)
2. If entry at index and index 1 match, return Result.err("no acceptable colors available")

## Opponent Candidates
1. Constructed from the `Work Tournament Players` array
2. Its elements are `players` who have not played the `Candidate Game Player` in the `Tournament`;
3. Sorted by tournament score(desc) and club rating(asc);

Our goal is to pair the the highest tournament and club rating player, with a player with the same tournament score, but a lower club rating. This enables us to have strong pairings, without pairing the strongest players during the initial rounds.

## Work Tournament Players
1. A copy of the `Tournament Players` array, sorted by `rank`;
2. We use it to pair the tournament players;
3. We prune the two players assigned to a game;
4. We complete the round pairing effort when this array's length is zero;

# Algorithm
1. Build Work Tournament Players
   1. Create a `Tournament Round`;
   2. Build the `Work Tournament Players` array:
   3. Select the `round bye player`, if necessary
      1. If the `Work Tournament Players` array length is odd:
         1. Select the lowest ranked player, `bye player` who has not had a previous bye or forfeit round as this round’s bye player;
         2. Create a `Game Bye`;
            1. Add the selected player;
            2. Add the `Game Bye` to the `Tournament Round`;
         4. Remove the `Game Bye` player from `Work Tournament Players`;
2. Repeat until `Work Tournament Players` is empty
   1. Select `Player_1`
      1. Create a `Candidate Game`;
      2. Select `Player_1` as the  first `Work Tournament Array` element;
      3. Assign `Player_1` game pieces color as the player's ideal color
   2. Build the `Opponent Candidate` array
3. Find a suitable `Player_2`
     1. For each `Opponent Candidate` in `Opponent Candidates`:
        1. Add it to the `Candidate Game` as `Player_2`;
        2. Assign `Player_2` game pieces color as the player's ideal color
        3. Calculate the `Candidate Game players` game pieces colors; see below for details
        4. If Result<<ITournamentPlayer, NULL>>.err
        5. Set `Player_2` as the first  `Opponent Candidates` element
        6. Create a `Tournament Game`
           1. If Result<<ITournamentPlayer, NULL>>.err
              1. Set `Player_2` as the the first  `Opponent Candidates` element
              2. Add a  `Tournament Game` flag for the `Tournament Director` to review the game;
              3. Assign the viable game pieces color to the `lowest ranked player`;
              4. Assign the opposite game pieces color for the `highest ranked player`;
        7. Add the `Tournament Game` to the `Tournament Round`
           1. Remove the `Player_1` and the `Player_2` from the `Work Tournament Players` array
        8. Repeat 2.2
## Calculate the `Candidate Game players` game pieces colors
Using the `Candidate Game Array`
1. If `player_1` and `player_2` have different game pieces colors
   1. return `Result.ok = assigned game pieces color`;
2. else
   1. Is it possible to reverse `Player_1`'s color
      1. reverse it
      2. return `Result.ok = assigned game pieces color`;
   2. else
      1. Is it possible to reverse `Player_2`'s color
         1. reverse it
         2. return `Result.ok = assigned game pieces color`;
      else
         3. return `Result.err = unable to assign game pieces color`;
      2. end
   3. end

# Personas
## club member
1. signs up for club membership on a public page
1. has a last nanme
1. has a first name
1. has address
1. has cell phone
1. has email address
1. has username
1. has password
1. has a club rating
1. has gamesPlayed
1. has status
tournament
1. ceated by a club member
1. has a current tournement score table
1. has players
1. has a director
1. has a start date
1. has an end date
1. has a maximum number of players
1. has the number of rounds
1. has the number of points for a win
1. has the number of points for a draw
1. has the number of points for a bye
1. has the number of points for a forfeit
1. has the number of points for a loss
1. has rounds
1. has status
## tournament round
1. created by a TD
1. has players
1. has games
1. has a status
## game
1. created by a TD
1. has a white pieces player
1. has the white pieces player score
1. has a black pieces player
1. has the black pieces player score
1. has a status

# Roles
## club member
1. Anyone can sign up to be a club member
## club administrator
1. A club member
1. Given the role by the system instantiator
1. has all other roles, except  system administrator
## tournament director
1. a club member who created a tournament
1. can create other tournament director
1. can plan the next tournament round
1. can start the next tournament round
1. can start a game
1. can stop a game
1. can close a round
1. can close a tournament
## player
1. a club member who signed up for a tournament
## system administrator
1. created at system instantiation time
1. can create other system administrator
1. can delete an existing system administrator, except the original one and itself
1. has all other roles


# Links and references
1. [Comparing Arrays](https://stackoverflow.com/questions/38498258/typescript-difference-between-two-arrays)
2. [Sort array by multiple fields](https://www.benmvp.com/blog/quick-way-sort-javascript-array-multiple-fields/)
3. [ts-results](https://www.npmjs.com/package/ts-results/v/3.3.0)
4. [How to Break Out of a JavaScript forEach() Loop](https://masteringjs.io/tutorials/fundamentals/foreach-break)
5. [Node Read File Sync](https://nodejs.org/docs/latest-v15.x/api/fs.html#fs_fs_readlinksync_path_options)
6. [How to Break Out of a JavaScript forEach() Loop](https://masteringjs.io/tutorials/fundamentals/foreach-break)
7. [How To Create Your Own TypeScript CLI — With Node.js](https://itnext.io/how-to-create-your-own-typescript-cli-with-node-js-1faf7095ef89)
