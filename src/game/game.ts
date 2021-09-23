import { Level } from "./level";

export class Game {

	private view: Level
	// private state: 'inGame' | 'ended' = 'onGame';
	// private view: GameView;
	

	constructor(){		
		this.view = new Level();		

		// this.init();
	}

}