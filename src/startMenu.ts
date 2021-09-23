import { AppState, GameData } from "./types/interfaces";
import { Game } from "./game/game";

export function showStartMenu(gameData: GameData) {

	let appState: AppState = 'idle';
	
	const containerEl: Element = document.querySelector('#container')!;
	const menuHTML: string = `
		<div class='menu__container'>
			<button class='menu__button'> Click to start </button>
		</div>
	`;

	containerEl.innerHTML = menuHTML;
	containerEl.addEventListener('click', () => {

		if (appState !== 'idle') return;

		appState = 'inGame';
		const game = new Game();		
	})
	
}