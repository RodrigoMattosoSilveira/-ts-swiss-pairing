# Introduction
Built using the [TypeScript Boilerplate for 2021 as template](https://github.com/metachris/typescript-boilerplate)

# Glossary
Glossary


2. **Player_1** - A `Tournament Player`, selected from the `Work Tournament Players` array;
3. **Opponent Candidate Game Players** - An `Tournament Player` array, constructed from the `Work Tournament Players` array:
   1. Its elements are players who have not played the `Candidate Game Player` in the `Tournament`;
   2. It consistes of two halves, `Higher` and `Lower` ranked players;
   3. The `Lower Ranked` players are appended from the player following the `Work Tournament Players` array midpoint player, and down to the lowest ranked`Candidate Game Player`;
   4. The ` Higher Ranked` players are appended from the player at `Work Tournament Players` array midpoint, and up to, but not, the `Candidate Game Player`;
4. **Last Two Games Colors** - A helper data structure used to select a player's next game pieces color;
5. **Opponent Candidates** An array of `Tournament Players`; see `Data Structures` below for details;
6. **Opponent Candidate** - A `Tournament Player`, selected from the `Opponent Candidates Players` array under consideration to play against a `Candidate Game Player`;
7. **Player_1** - A `Tournament Player`, selected from the `Work Tournament Players` array;
8. **Player_2** - A `Tournament Player`, selected from the `Opponent Candidates` array;
9. **Round Bye Player** - A `Tournament Player` that does not play on a given `Tournament Round` to render the number of round players even;
10. **Tournament Player** - A `Club Member` that signed up for a `Tournament`;
11. **Tournament players** - The array of `Tournament players`;
12. **Tournament Rank** - Also, `rank`, a sorting key consisting of the `Tournament Player's` current `Tournament Score` and their `Club Rating` at the start of the `Tournament`; we use the later to break ties;
13. **Tournament Round** - A collection of games planned as part of a given round;
14. **Work Tournament Players** - A copy of the `Tournament Players` array, sorted by `rank`; then pruned of players assigned to games;

# Data Structures
## Last Two Games Colors
This is 2-entries string arra describing a `Tournament Player's` last two games' pieces colors, and used to select the player's next game pieces color:
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
1. Derieved the `Work Tournament Players` array, It has two halves:
  1. The `first half` consist of the players from the player at the middle of the array, up to but not includling player_1;
  3. The `second  half` consist of the players from the player at the middle of the array down to the last player in the array;

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
      1. Only append an `Opponent Candidate Player` who have not played against the `Player_1` in the tournament;
      2. Determine the `Work Tournament Players` array `mid ranked player`;
      3. Starting at the `mid ranked player`, append it and all `higher ranked` players until the `Game Candidate Player`;
      4. Starting at the` mid ranked player`, append all `lower ranked players`;
   3. Find a suitable `Player_2`
      1. For each `Opponent Candidate` in `Opponent Candidates`:
         1. Add it to the `Candidate Game` as `Player_2`;
         2. Assign `Player_2` game pieces color as the player's ideal color
         3. Calculate the `Candidate Game players` game pieces colors:
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
# Methods to Create
1. Build the `Work Tournament Players` array;
2. Create a `Game Bye, if necessary;
5. Remove player from `Work Tournament Players` array;
6. Create a `Game Candidate`;
7. Build the `Opponent Candidate Players` array
8. Select an  `Opponent Candidate Player`
9 Select a `Game Candidate` players' game colors;


is the oppotive of their last game; although it is OK to play two games with the same color, it is not OK to play three ganes with the sames color; this is string array with two entries, describing the acceptable color for their next game:
1. If no entries, either color; we have a bias to assigning the white pieces to lower ranked players;
1. The string at index 0, if present, is the prefered for their next game; it is the opposite of their last game's color;
1. The string at index 1, if present, is the same color as their last game'color, only and if only the player has not played with the same color in their last two games;
2. **Candidate Game** - A `Round Game` under construction as we calculate the players' colors; it becomes a `Tournament Game` when both players have legal game pieces color;
