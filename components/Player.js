// Set up the Player Class: 
	// id, player, score, currentPlay, lastPlay, method: updateScore++
class Player{
	constructor(
		id,
		name,
		score,
		currentPlay,
		lastPlay
	) {
		this.id = id;
		this.score = score;
		this.currentPlay = currentPlay;
		this.lastPlay = lastPlay;
	}
	updateScore(score) {
		this.score++;
    return score;
	}
}

// Export the Backpack class to be used by other files
export default Player;