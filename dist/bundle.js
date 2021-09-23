/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.app = void 0;\r\nconst startMenu_1 = __webpack_require__(/*! ./startMenu */ \"./src/startMenu.ts\");\r\nfunction app() {\r\n    const gameData = {\r\n        lastScore: 0,\r\n        bestScore: 0\r\n    };\r\n    (0, startMenu_1.showStartMenu)(gameData);\r\n}\r\nexports.app = app;\r\n\n\n//# sourceURL=webpack://arcanoid_by_ANDROid/./src/app.ts?");

/***/ }),

/***/ "./src/game/game.ts":
/*!**************************!*\
  !*** ./src/game/game.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Game = void 0;\r\nconst level_1 = __webpack_require__(/*! ./level */ \"./src/game/level.ts\");\r\nclass Game {\r\n    // private state: 'inGame' | 'ended' = 'onGame';\r\n    // private view: GameView;\r\n    constructor() {\r\n        this.view = new level_1.Level();\r\n        // this.init();\r\n    }\r\n}\r\nexports.Game = Game;\r\n\n\n//# sourceURL=webpack://arcanoid_by_ANDROid/./src/game/game.ts?");

/***/ }),

/***/ "./src/game/level.ts":
/*!***************************!*\
  !*** ./src/game/level.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Level = void 0;\r\nconst defaultCanvasSetting = {\r\n    width: 400,\r\n    height: 500,\r\n    borderColor: '#000000'\r\n};\r\nconst level1 = [\r\n    [],\r\n    [],\r\n    [],\r\n    [],\r\n    [],\r\n    [],\r\n    ['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'],\r\n    ['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'],\r\n    ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],\r\n    ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],\r\n    ['G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G'],\r\n    ['G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G'],\r\n    ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y'],\r\n    ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y']\r\n];\r\nclass Level {\r\n    constructor() {\r\n        this.map = level1;\r\n        this.canvasConfig = {\r\n            ...defaultCanvasSetting,\r\n            bgImgSrc: '../../sprites/bg-2.png'\r\n        };\r\n        // view configs\r\n        this.colorMap = {\r\n            'R': 'red',\r\n            'O': 'orange',\r\n            'G': 'green',\r\n            'Y': 'yellow'\r\n        };\r\n        this.brickConfig = {\r\n            brickGap: 2,\r\n            brickWidth: 25,\r\n            brickHeight: 12,\r\n        };\r\n        this.wallSize = 12;\r\n        this.paddle = {\r\n            // ставим её внизу по центру поля\r\n            x: this.canvasConfig.width / 2 - this.brickConfig.brickWidth / 2,\r\n            y: 440,\r\n            width: this.brickConfig.brickWidth,\r\n            height: this.brickConfig.brickHeight,\r\n            dx: 0,\r\n            img: Level.loadImgForPaddle()\r\n        };\r\n        this.ball = {\r\n            x: 130,\r\n            y: 260,\r\n            width: 5,\r\n            height: 5,\r\n            speed: 2,\r\n            dx: 0,\r\n            dy: 0\r\n        };\r\n        this.bricks = [];\r\n        const canvas = document.createElement('canvas');\r\n        this.ctx = canvas.getContext(\"2d\");\r\n        this.canvas = canvas;\r\n        this.init();\r\n    }\r\n    setBasicCanvasConfig() {\r\n        // TODO bg img\t\t\r\n        this.canvas.width = this.canvasConfig.width;\r\n        this.canvas.height = this.canvasConfig.height;\r\n        this.ctx.fillStyle = this.canvasConfig.borderColor;\r\n        this.ctx.fillRect(0, 0, this.canvas.width, 12);\r\n        this.ctx.fillRect(0, 0, 12, this.canvas.height);\r\n        this.ctx.fillRect(this.canvas.width - 12, 0, 12, this.canvas.height);\r\n    }\r\n    setBricks() {\r\n        const { brickGap, brickHeight, brickWidth } = this.brickConfig;\r\n        for (let row = 0; row < this.map.length; row++) {\r\n            for (let col = 0; col < this.map[row].length; col++) {\r\n                const colorCode = this.map[row][col];\r\n                this.bricks.push({\r\n                    x: this.wallSize + (brickWidth + brickGap) * col,\r\n                    y: this.wallSize + (brickHeight + brickGap) * row,\r\n                    color: this.colorMap[colorCode],\r\n                    width: brickWidth,\r\n                    height: brickHeight\r\n                });\r\n            }\r\n        }\r\n    }\r\n    static loadImgForPaddle() {\r\n        const image = document.createElement('img');\r\n        // image.src = 'https://unsplash.com/photos/rgFScQhM3A0';\r\n        image.src = '../sprites/small-paddle.png';\r\n        return image;\r\n    }\r\n    setListeners() {\r\n        document.addEventListener('keydown', (e) => {\r\n            // left arrow\r\n            if (e.keyCode === 37) {\r\n                this.paddle.dx = -3;\r\n            }\r\n            // right arrow\r\n            else if (e.keyCode === 39) {\r\n                this.paddle.dx = 3;\r\n            }\r\n            // space bar\r\n            if (this.ball.dx === 0 && this.ball.dy === 0 && e.keyCode === 32) {\r\n                this.ball.dx = this.ball.speed;\r\n                this.ball.dy = this.ball.speed;\r\n            }\r\n        });\r\n        // stop moving\r\n        document.addEventListener('keyup', (e) => {\r\n            if (e.keyCode === 37 || e.keyCode === 39) {\r\n                this.paddle.dx = 0;\r\n            }\r\n        });\r\n    }\r\n    manipulateBallPhysics() {\r\n        if (this.ball.x < this.wallSize) {\r\n            this.ball.x = this.wallSize;\r\n            this.ball.dx *= -1;\r\n        }\r\n        else if (this.ball.x + this.ball.width > this.canvas.width - this.wallSize) {\r\n            this.ball.x = this.canvas.width - this.wallSize - this.ball.width;\r\n            this.ball.dx *= -1;\r\n        }\r\n        if (this.ball.y < this.wallSize) {\r\n            this.ball.y = this.wallSize;\r\n            this.ball.dy *= -1;\r\n        }\r\n        if (this.ball.y > this.canvas.height) {\r\n            this.ball.x = 130;\r\n            this.ball.y = 260;\r\n            this.ball.dx = 0;\r\n            this.ball.dy = 0;\r\n        }\r\n    }\r\n    manipulateBrakingBlocks() {\r\n        const collides = (ball, paddle) => {\r\n            return ball.x < paddle.x + paddle.width &&\r\n                ball.x + ball.width > paddle.x &&\r\n                ball.y < paddle.y + paddle.height &&\r\n                ball.y + ball.height > paddle.y;\r\n        };\r\n        if (collides(this.ball, this.paddle)) {\r\n            this.ball.dy *= -1;\r\n            this.ball.y = this.paddle.y - this.ball.height;\r\n        }\r\n        for (let index = 0; index < this.bricks.length; index++) {\r\n            const brick = this.bricks[index];\r\n            if (collides(this.ball, brick)) {\r\n                this.bricks.splice(index, 1);\r\n                // collides from top or bott\r\n                if (this.ball.y + this.ball.height - this.ball.speed <= brick.y ||\r\n                    this.ball.y >= brick.y + brick.height - this.ball.speed) {\r\n                    this.ball.dy *= -1;\r\n                }\r\n                else {\r\n                    this.ball.dx *= -1;\r\n                }\r\n                break;\r\n            }\r\n        }\r\n    }\r\n    renderLevel() {\r\n        requestAnimationFrame(() => this.renderLevel());\r\n        // clear canvas \r\n        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\r\n        // move platform\r\n        this.paddle.x += this.paddle.dx;\r\n        if (this.paddle.x < this.wallSize) {\r\n            this.paddle.x = this.wallSize;\r\n        }\r\n        else if (this.paddle.x + this.brickConfig.brickWidth > this.canvas.width - this.wallSize) {\r\n            this.paddle.x = this.canvas.width - this.wallSize - this.brickConfig.brickWidth;\r\n        }\r\n        //move ball\r\n        this.ball.x += this.ball.dx;\r\n        this.ball.y += this.ball.dy;\r\n        this.manipulateBallPhysics();\r\n        this.manipulateBrakingBlocks();\r\n        //draw paddle\r\n        this.ctx.drawImage(this.paddle.img, this.paddle.x, this.paddle.y);\r\n        //draw ball\r\n        if (this.ball.dx || this.ball.dy) {\r\n            //TODO: add ball img or color\r\n            this.ctx.fillStyle = 'yellow';\r\n            this.ctx.fillRect(this.ball.x, this.ball.y, this.ball.width, this.ball.height);\r\n        }\r\n        //draw bricks\r\n        this.bricks.forEach(brick => {\r\n            this.ctx.fillStyle = brick.color;\r\n            this.ctx?.fillRect(brick.x, brick.y, brick.width, brick.height);\r\n        });\r\n        //draw the walls\r\n        this.ctx.fillStyle = this.canvasConfig.borderColor;\r\n        this.ctx.fillRect(0, 0, this.canvas.width, 12);\r\n        this.ctx.fillRect(0, 0, 12, this.canvas.height);\r\n        this.ctx.fillRect(this.canvas.width - 12, 0, 12, this.canvas.height);\r\n    }\r\n    init() {\r\n        // set canvas into html\r\n        const container = document.querySelector('#container');\r\n        container.innerHTML = '';\r\n        container.appendChild(this.canvas);\r\n        this.setBasicCanvasConfig();\r\n        this.setBricks();\r\n        this.setListeners();\r\n        requestAnimationFrame(() => this.renderLevel());\r\n    }\r\n}\r\nexports.Level = Level;\r\n\n\n//# sourceURL=webpack://arcanoid_by_ANDROid/./src/game/level.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst app_1 = __webpack_require__(/*! ./app */ \"./src/app.ts\");\r\n(0, app_1.app)();\r\n\n\n//# sourceURL=webpack://arcanoid_by_ANDROid/./src/index.ts?");

/***/ }),

/***/ "./src/startMenu.ts":
/*!**************************!*\
  !*** ./src/startMenu.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.showStartMenu = void 0;\r\nconst game_1 = __webpack_require__(/*! ./game/game */ \"./src/game/game.ts\");\r\nfunction showStartMenu(gameData) {\r\n    let appState = 'idle';\r\n    const containerEl = document.querySelector('#container');\r\n    const menuHTML = `\r\n\t\t<div class='menu__container'>\r\n\t\t\t<button class='menu__button'> Click to start </button>\r\n\t\t</div>\r\n\t`;\r\n    containerEl.innerHTML = menuHTML;\r\n    containerEl.addEventListener('click', () => {\r\n        if (appState !== 'idle')\r\n            return;\r\n        appState = 'inGame';\r\n        const game = new game_1.Game();\r\n    });\r\n}\r\nexports.showStartMenu = showStartMenu;\r\n\n\n//# sourceURL=webpack://arcanoid_by_ANDROid/./src/startMenu.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;