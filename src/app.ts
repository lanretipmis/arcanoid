import { GameData } from './interfaces';
import { showStartMenu } from './startMenu';

export function app () {

	const gameData: GameData = {
		lastScore: 0,
		bestScore: 0
	};

	showStartMenu(gameData);
}

