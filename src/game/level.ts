import { Colors, ColorsMap, Paddle, Ball, Brick } from "../interfaces";
const defaultCanvasSetting = {
	width: 400, 
	height: 500,
	borderColor: '#000000'
};

const level1: Colors[][] =  [
	[],
	[],
	[],
	[],
	[],
	[],
	['R','R','R','R','R','R','R','R','R','R','R','R','R','R'],
	['R','R','R','R','R','R','R','R','R','R','R','R','R','R'],
	['O','O','O','O','O','O','O','O','O','O','O','O','O','O'],
	['O','O','O','O','O','O','O','O','O','O','O','O','O','O'],
	['G','G','G','G','G','G','G','G','G','G','G','G','G','G'],
	['G','G','G','G','G','G','G','G','G','G','G','G','G','G'],
	['Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y'],
	['Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y']
  ];

export class Level {

	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private map: string[][] = level1;

	private canvasConfig = {
		...defaultCanvasSetting,
		bgImgSrc: '../../sprites/bg-2.png'
	}

	// view configs
	private colorMap: ColorsMap = {
		'R': 'red',
		'O': 'orange',
		'G': 'green',
		'Y': 'yellow'
  	};
	private brickConfig = {
		brickGap :2,
		brickWidth: 25,
		brickHeight :12,
	}
	private wallSize = 12;
	private paddle: Paddle = {
		// ставим её внизу по центру поля
		x: this.canvasConfig.width / 2 - this.brickConfig.brickWidth / 2,
		y: 440,
		width: this.brickConfig.brickWidth,
		height: this.brickConfig.brickHeight,
		dx: 0
	};
	private ball: Ball = {
		x: 130,
		y: 260,
		width: 5,
		height: 5,
		speed: 2,
		dx: 0,
		dy: 0
	  };


	constructor() {
		const canvas = document.createElement('canvas');
		this.ctx = canvas.getContext("2d")!;
		this.canvas = canvas;

		this.init();		
	}


	private setBasicCanvasConfig() {
		// TODO bg img		
		this.canvas.width = this.canvasConfig.width;
		this.canvas.height = this.canvasConfig.height;

		if (!this.ctx) return;
		this.ctx.fillStyle = this.canvasConfig.borderColor;
		this.ctx.fillRect(0, 0, this.canvas.width, 12);
		this.ctx.fillRect(0, 0, 12, this.canvas.height);
		this.ctx.fillRect(this.canvas.width - 12, 0, 12, this.canvas.height);
	}

	private setBricksOnCanvas() {
		const bricks: Brick[] = [];
		const {brickGap, brickHeight, brickWidth} = this.brickConfig;
		for (let row = 0; row < level1.length; row++) {
			for (let col = 0; col < level1[row]!.length; col++) {
		  
			  const colorCode = level1[row]![col]!;
		  
			  bricks.push({
				x: this.wallSize + (brickWidth + brickGap) * col,
				y: this.wallSize + (brickHeight + brickGap) * row,
				color: this.colorMap[colorCode],
				width: brickWidth,
				height: brickHeight
			  });
			}
	  	}

		bricks.forEach(brick => {
			this.ctx.fillStyle = brick.color;
			this.ctx?.fillRect(brick.x, brick.y, brick.width, brick.height);
		});
		  
	}

	// from mozilla gams
	private collides(ball: Ball, paddle: Paddle | Brick) {
		return ball.x < paddle.x + paddle.width &&
			   ball.x + ball.width > paddle.x &&
			   ball.y < paddle.y + paddle.height &&
			   ball.y + ball.height > paddle.y;
    }

	private setListeners() {
		document.addEventListener('keydown', (e: KeyboardEvent) => {
			
			// left arrow
			if (e.keyCode === 37) {
				this.paddle.dx = -3;
			}

			// right arrow
			else if (e.keyCode === 39) {
				this.paddle.dx = 3;
			}
		  
			// space bar
			if (this.ball.dx === 0 && this.ball.dy === 0 && e.keyCode === 32) {
			  this.ball.dx = this.ball.speed;
			  this.ball.dy = this.ball.speed;
			}
		  });
		  
		  // stop moving
		  document.addEventListener('keyup', (e) => {
			if (e.keyCode === 37 || e.keyCode === 39) {
			  this.paddle.dx = 0;
			}
		  });
	}

	private startGame() {

		requestAnimationFrame(() => this.startGame());

		// clear canvas 
		this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
		
		// move platform
		this.paddle.x += this.paddle.dx;
		if (this.paddle.x < this.wallSize) {
			this.paddle.x = this.wallSize
		}
		 else if (this.paddle.x + this.brickConfig.brickWidth > this.canvas.width - this.wallSize) {
			this.paddle.x = this.canvas.width - this.wallSize - this.brickConfig.brickWidth;
		}
		

		  this.ctx.fillStyle = 'cyan';
		  this.ctx.fillRect(this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height);
	}	

	private init() {

		// set canvas into html
		const container: HTMLDivElement = document.querySelector('#container')!;
		container.innerHTML = '';
		container.appendChild(this.canvas);

		this.setBasicCanvasConfig();
		this.setBricksOnCanvas();
		this.setListeners();
		requestAnimationFrame(() => this.startGame());
	}

}