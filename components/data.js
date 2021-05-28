// Import the Backpack class so we can make new Backpack objects.
import Player from "./Player.js";

// Set up the Player Class: 
	// id, score, currentPlay, lastPlay, method: updateScore++

// Create new Player Object
const userPlayer= new Player(
  "user",
  0,
  "",
  ""
);

// Create new Player Object
const computerPlayer= new Player(
  "comp",
  0,
  "",
  ""
);

// Add objects into an array
const playerObjectArray = [userPlayer, computerPlayer];

// Export the array to be used in other files
export default playerObjectArray;
