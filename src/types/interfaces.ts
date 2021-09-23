export type AppState = 'idle' | 'inGame';
export type GameData = {
	lastScore: number,
	bestScore: number
}

//level interfaces
export type Colors = 'R' | 'O' | 'G' | 'Y';
export interface ColorsMap {
	'R': 'red',
	'O': 'orange',
	'G': 'green',
	'Y': 'yellow'
}
export interface Paddle  {
	x: number,
	y: number,
	width: number,
	height: number,
	// direction x
	dx: number,
	img: HTMLImageElement
}
export interface Brick {
	x: number,
	y: number,
	color: string,
	width: number,
	height: number
}
export interface Ball {
	// start coords
	x: number,
	y: number,
	width: number,
	height: number,
	speed: number,
	
	// direction x, y
	dx: number,
	dy: number
  }