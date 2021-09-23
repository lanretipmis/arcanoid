import { Level } from "./level";

export class Game {

	private level: Level
	// private state: 'inGame' | 'ended' = 'onGame';
	// private view: GameView;
	

	constructor(){		
		this.level = new Level();		

		// this.init();
	}

}