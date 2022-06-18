# Introduction
Built using the [TypeScript Boilerplate for 2021 as template](https://github.com/metachris/typescript-boilerplate)

# Glossary
Glossary
1. **Tournament player** - A club member that signed up for a tournament;
2. **Tournament Rank** - Also, rank, a player current tournament score and their tournament ELO rate; we use the later to break ties;
3. **Tournament player acceptable piece colors** - An array of strings with two entries, describing the player' acceptable piece colors for their next game:
   1. If no entries, either color; we have a bias to assigning the white game pieces to lower ranked players;
   1. The string at index 0, if present, it represents the player first preferred game pieces color for their next game, which is the opposite to the player's last game pieces color;
   1. The string at index 1, if present, it represents the player second game pieces color preference for their next game, only and if only the player has not played with it in their last two games;
4. **Tournament players** - The array of tournament players
5. **Work Tournament players** - A copy of the  array of tournament players, sorted by rank;
6. **Candidate Round** - A tournament round under construction; it becomes a Tournament Game when the Tournament Director officially starts it;
7. **Candidate Game** - A game under construction; it becomes a Tournament Game when the Tournament Director officially starts its round;
8. **Candidate Game Player** - A Tournament Player, selected from the Work Tournament players array under consideration for a Candidate Game;
9. **Opponent Candidate Game Player** - A Tournament Player, selected from the Work Tournament players array under consideration to play against a Candidate Game Playe;

# Algorithm
1. Build the Work Tournament Array:
   1. If the Work Tournament Players Array length is odd:
      1. Select the lowest ranked player who has not had a previous bye or forfeit round as this round’s bye player;
      2. Create a Candidate Game Bye;
         1. Add the selected player;
         2. Add the Candidate Game Bye to the Candidate Tournament;
      3. Add Tournament Game to the Tournament Round;
      4. Remove the selected player from the Work Tournament Players Array;
2. Repeat
   1. Select a Game Candidate:
      1. Select the Game Candidate Player;
         1. Pick first Work Tournament Array element;
         2. Add them to  Game Candidate ;
         3. Use their first preferred game pieces color for their next game, if present, or Black Pieces, if none, as their game pieces color;
   2. Build the Opponent Candidates array
      1. Determine the Work Tournament Array mid ranked player;
         1. Copy the mid ranked player and its lower add all players who have not played against the Game Candidate Player in the tournament;
   3. For each Opponent Candidate in Opponent Candidates
      1. Add it to the  Candidate Game; use their first preferred game pieces color for their next game, or While Pieces if none, as their game's pieces color;
      2. If both candidates same game piece color:
         1. Assign the first preferred game pieces color for their next game, if present, to the lowest ranking player;
         2. If both candidates same game piece color:
            1. Assign the first preferred game pieces color for their next game, if present, to the highest ranking player;
            2. If both candidates same game piece color:
               1. Create a Tournament Game
                  1. Assign first preferred game pieces color for their next game to the lowest ranked player
                  2. Assign the opposite game pieces color for their next game to the highest ranked player
                  3. Add a flag for the Tournament Director to review this game
               2. Add Tournament Game to the Tournament Round
               3. Remove the Game Candidate Player and the Opponent Game Candidate Player from the Work Tournament Array
               4. Repeat 2.3
      3. If Opponent candidate Game Candidate Player not found
         1. Select the first  Opponent Candidate in Opponent Candidates
      4. Create a Tournament Game
         1. Assign first preferred game pieces color for their next game to the lowest ranked player
         2. Assign the opposite game pieces color for their next game to the highest ranked player
      5. Add Tournament Game to the Tournament Round
      6. Remove the Game Candidate Player and the Opponent Game Candidate Player from the Work Tournament Array
      7. Repeat 2.3

