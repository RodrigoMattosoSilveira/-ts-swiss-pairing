# Introduction
Built using the [TypeScript Boilerplate for 2021 as template](https://github.com/metachris/typescript-boilerplate)

# Glossary
Glossary

1. **Acceptable Piece Colors** - An array of strings with two entries, describing the the `Tournament Player's`' acceptable piece colors for their next game:
   1. If no entries, either color; we have a bias to assigning the white game pieces to lower ranked players;
   1. The string at index 0, if present, it represents the player's first pieces color preference game for their next game, which is the opposite to the player's last game pieces color;
   1. The string at index 1, if present, it represents the player's second game pieces color preference for their next game, only and if only the player has not played with the same pice color in their last two games;
2. **Candidate Game** - A `Round Game` under construction; it becomes a `Tournament Game` when both players have legal game pieces color;
3. **Candidate Game Player** - A `Tournament Player`, selected from the `Work Tournament Players` array under consideration for a `Candidate Game`;
4. **Opponent Candidate Game Players** - An `Tournament Player` array, selected from the `Work Tournament Players` array:
   1. Its elements are players who have not played the `Candidate Game Player` in the `Tournament`;
   2. It consistes of two halves, `Higher` and `Lower` ranked players;
   3. The `Higher Ranked` players are appended from the player following the `Work Tournament Players` array midpoint player, and down to the lowest ranked`Candidate Game Player`;
   4. The `Lower Ranked` players are appended from the player at `Work Tournament Players` array midpoint, and up to, but not, the `Candidate Game Player`;
5. **Opponent Candidate Player** - A `Tournament Player`, selected from the `Opponent Candidates Players` array under consideration to play against a `Candidate Game Player`;
6. **Round bye player** - A `Tournament Player` that does not play on a given `Tournament Round` to render the number of round players even;
7. **Tournament Player** - A `Club Member` that signed up for a `Tournament`;
8. **Tournament players** - The array of tournament players;
9. **Tournament Rank** - Also, `rank`, a sorting key consisting of the `Tournament Player's` current `Tournament Score` and their `Tournament ELO Rate`; we use the later to break ties;
10. **Tournament Round** - A collection of games planned as part of a given round;
11. **Work Tournament Players** - A copy of the `Tournament Players` array, sorted by `rank`;

# Algorithm
1. Build the `Work Tournament Players` array:
   1. Select the `round bye player`, if necessary
      1. If the `Work Tournament Players` array length is odd:
         1. Select the lowest ranked player who has not had a previous bye or forfeit round as this round’s bye player;
         2. Create a `Game Bye`;
            1. Add the selected player;
            2. Add the `Game Bye` to the `Candidate Round`;
         3. Add the `Game Bye` to the `Round Candidate`;
         4. Remove the `selected player` from the `Work Tournament Players` array;
2. Repeat
   1. Create a `Game Candidate`;
   2. Select a `Game Candidate Player`:
      1. The first `Work Tournament Array` element is the Game `Candidate Player`;
      2. Use their first preferred game pieces color for their next game, if present, or Black Pieces, if none, as their game pieces color;
      3. Add it to `Game Candidate`
   3. Build the `Opponent Candidate Players` array
      1. Only append `Opponent Candidates Players` who have not played against the `Game Candidate Player` in the tournament;
      2. Determine the `Work Tournament Players` array `mid ranked player`;
      3. Starting at the `mid ranked player`, append it and all `higher ranked` players until the `Game Candidate Player`;
      4. Starting at the` mid ranked player`, append all `lower ranked players`;
   4. Find a suitable `Opponent Candidate Player
      1. For each `Opponent Candidate Player` in `Opponent Candidates Players`:
         1. Add it to the `Candidate Game`;
         2. Use their `first preferred game pieces color for their next game`, or While Pieces if none, as their game's pieces color;
         3. Calculate the `Candidate Game players` game pieces colors`:
            1. If both `Candidate Game players` same game piece color:
               1. Assign the first preferred game pieces color for their next game, if present, to the lower ranked player;
               2. If both candidates same game piece color:
                  1. Assign the first preferred game pieces color for their next game, if present, to the highest ranked player;
                  2. If both candidates same game piece color:
                     1. Set the `Opponent Candidate Player` to `Result<<ITournamentPlayer, NULL>>` = null;
         4. If Result<<ITournamentPlayer, NULL>>.err
            1. Select the first  `Opponent Candidate Player` in `Opponent Candidates`
         5. Create a `Tournament Game`
            1. If Result<<ITournamentPlayer, NULL>>.err
               1. Select the first  `Opponent Candidate Player` in `Opponent Candidates`;
               2. Add a  `Tournament Game` flag for the `Tournament Director` to review the game;
            2. Assign `first preferred game pieces color for their next game` to the `lowest ranked player`;
            3. Assign the opposite game pieces color for their next game to the `highest ranked player`;
         6. Add the `Tournament Game` to the `Tournament Round`
            1. Remove the `Game Candidate Player` and the `Opponent Game Candidate Player` from the `Work Tournament Players` array
         7. Repeat 2.2
            Methods to Create
# Methods to Create
1. Build the `Work Tournament Players` array;
2. Select `Bye Player`;
3. Create a `Game Bye`;
4. Add a Game to the `Round Candidate` array;
5. Remove player from `Work Tournament Players` array;
6. Create a `Game Candidate`;
7. Build the `Opponent Candidate Players` array
8. Select an  `Opponent Candidate Player`
9 Select a `Game Candidate` players' game colors;
