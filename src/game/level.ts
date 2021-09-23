import { Colors, ColorsMap, Paddle, Ball, Brick } from "../types/interfaces";
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
		dx: 0,
		img: Level.loadImgForPaddle()
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
	private bricks: Brick[] =[];


	constructor() {
		const canvas = document.createElement('canvas');
		this.ctx = canvas.getContext("2d")!;
		this.canvas = canvas;
		this.canvas.width = this.canvasConfig.width;
		this.canvas.height = this.canvasConfig.height;

		this.init();		
	}

	private setBricks() {
		const {brickGap, brickHeight, brickWidth} = this.brickConfig;
		for (let row = 0; row < this.map.length; row++) {
			for (let col = 0; col < this.map[row]!.length; col++) {
		  
			  const colorCode = this.map[row]![col]! as keyof ColorsMap;
		  
			  this.bricks.push({
				x: this.wallSize + (brickWidth + brickGap) * col,
				y: this.wallSize + (brickHeight + brickGap) * row,
				color: this.colorMap[colorCode],
				width: brickWidth,
				height: brickHeight
			  });
			}
	  	}

	}

    static loadImgForPaddle():HTMLImageElement {
	    const image = document.createElement('img');
		image.src = '../sprites/small-paddle.png';
	    return image;
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

	private manipulateBallPhysics() {
		if (this.ball.x < this.wallSize) {
			this.ball.x = this.wallSize;
			this.ball.dx *= -1;
		}
		else if (this.ball.x + this.ball.width > this.canvas.width - this.wallSize) {
			this.ball.x = this.canvas.width - this.wallSize - this.ball.width;
			this.ball.dx *= -1;
		}

		if (this.ball.y < this.wallSize) {
			this.ball.y = this.wallSize;
			this.ball.dy *= -1;
		}

		if (this.ball.y > this.canvas.height) {
			this.ball.x = 130;
			this.ball.y = 260;
			this.ball.dx = 0;
			this.ball.dy = 0;
		}
	}

	private manipulateBrakingBlocks() {
		const collides = (ball: Ball, paddle: Paddle | Brick) => {
			return ball.x < paddle.x + paddle.width &&
				ball.x + ball.width > paddle.x &&
				ball.y < paddle.y + paddle.height &&
				ball.y + ball.height > paddle.y;
		}

		if (collides(this.ball, this.paddle)) {
			this.ball.dy *= -1;
			this.ball.y = this.paddle.y - this.ball.height;
		}

		for(let index = 0; index < this.bricks.length; index++)  {
			const brick = this.bricks[index]!;
			if (collides(this.ball, brick)) {

				this.bricks.splice(index, 1);

				// collides from top or bott
				if (this.ball.y + this.ball.height - this.ball.speed <= brick.y ||
					this.ball.y >= brick.y + brick.height - this.ball.speed) {
					this.ball.dy *= -1;
				} else {
					this.ball.dx *= -1;
				}

				break;
			}
		}
	}

	private renderLevel() {

		requestAnimationFrame(() => this.renderLevel());

		// clear canvas 
		this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
		
		// move platform
		this.paddle.x += this.paddle.dx;
		if (this.paddle.x < this.wallSize) {
			this.paddle.x = this.wallSize
		} else if (this.paddle.x + this.brickConfig.brickWidth > this.canvas.width - this.wallSize) {
			this.paddle.x = this.canvas.width - this.wallSize - this.brickConfig.brickWidth;
		}

		//move ball
		this.ball.x += this.ball.dx;
		this.ball.y += this.ball.dy;

		this.manipulateBallPhysics();
		this.manipulateBrakingBlocks();

		//draw paddle
		this.ctx.drawImage(this.paddle.img, this.paddle.x, this.paddle.y);

		//draw ball
		if (this.ball.dx || this.ball.dy) {
			//TODO: add ball img or color
			this.ctx.fillStyle = 'yellow';
			this.ctx.fillRect(this.ball.x, this.ball.y, this.ball.width, this.ball.height);
		}

		//draw bricks
		this.bricks.forEach(brick => {
			this.ctx.fillStyle = brick.color;
			this.ctx?.fillRect(brick.x, brick.y, brick.width, brick.height);
		});

		//draw the walls
		// this.ctx.fillStyle = this.canvasConfig.borderColor;
		this.ctx.fillStyle = 'red';
		this.ctx.fillRect(0, 0, this.canvas.width, 12);
		this.ctx.fillRect(0, 0, 12, this.canvas.height);
		this.ctx.fillRect(this.canvas.width - 12, 0, 12, this.canvas.height);
	}	

	private init() {

		// set canvas into html
		const container: Element = document.querySelector('#container')!;
		container.innerHTML = '';
		container.appendChild(this.canvas);

		this.setBricks();
		this.setListeners();
		requestAnimationFrame(() => this.renderLevel());

		//ToDo bg canvas for image
	}

}