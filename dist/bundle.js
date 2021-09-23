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

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.app = void 0;\nconst startMenu_1 = __webpack_require__(/*! ./startMenu */ \"./src/startMenu.ts\");\nfunction app() {\n    const gameData = {\n        lastScore: 0,\n        bestScore: 0\n    };\n    (0, startMenu_1.showStartMenu)(gameData);\n}\nexports.app = app;\n\n\n//# sourceURL=webpack://arcanoid_by_ANDROid/./src/app.ts?");

/***/ }),

/***/ "./src/game/game.ts":
/*!**************************!*\
  !*** ./src/game/game.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Game = void 0;\nconst level_1 = __webpack_require__(/*! ./level */ \"./src/game/level.ts\");\nclass Game {\n    // private state: 'inGame' | 'ended' = 'onGame';\n    // private view: GameView;\n    constructor() {\n        this.view = new level_1.Level();\n        // this.init();\n    }\n}\nexports.Game = Game;\n\n\n//# sourceURL=webpack://arcanoid_by_ANDROid/./src/game/game.ts?");

/***/ }),

/***/ "./src/game/level.ts":
/*!***************************!*\
  !*** ./src/game/level.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Level = void 0;\nconst defaultCanvasSetting = {\n    width: 400,\n    height: 500,\n    borderColor: '#000000'\n};\nconst level1 = [\n    [],\n    [],\n    [],\n    [],\n    [],\n    [],\n    ['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'],\n    ['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'],\n    ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],\n    ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],\n    ['G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G'],\n    ['G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G'],\n    ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y'],\n    ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y']\n];\nclass Level {\n    constructor() {\n        this.map = level1;\n        this.canvasConfig = {\n            ...defaultCanvasSetting,\n            bgImgSrc: '../../sprites/bg-2.png'\n        };\n        // view configs\n        this.colorMap = {\n            'R': 'red',\n            'O': 'orange',\n            'G': 'green',\n            'Y': 'yellow'\n        };\n        this.brickConfig = {\n            brickGap: 2,\n            brickWidth: 25,\n            brickHeight: 12,\n        };\n        this.wallSize = 12;\n        this.paddle = {\n            // ставим её внизу по центру поля\n            x: this.canvasConfig.width / 2 - this.brickConfig.brickWidth / 2,\n            y: 440,\n            width: this.brickConfig.brickWidth,\n            height: this.brickConfig.brickHeight,\n            dx: 0\n        };\n        this.ball = {\n            x: 130,\n            y: 260,\n            width: 5,\n            height: 5,\n            speed: 2,\n            dx: 0,\n            dy: 0\n        };\n        const canvas = document.createElement('canvas');\n        this.ctx = canvas.getContext(\"2d\");\n        this.canvas = canvas;\n        this.init();\n    }\n    setBasicCanvasConfig() {\n        // TODO bg img\t\t\n        this.canvas.width = this.canvasConfig.width;\n        this.canvas.height = this.canvasConfig.height;\n        if (!this.ctx)\n            return;\n        this.ctx.fillStyle = this.canvasConfig.borderColor;\n        this.ctx.fillRect(0, 0, this.canvas.width, 12);\n        this.ctx.fillRect(0, 0, 12, this.canvas.height);\n        this.ctx.fillRect(this.canvas.width - 12, 0, 12, this.canvas.height);\n    }\n    setBricksOnCanvas() {\n        const bricks = [];\n        const { brickGap, brickHeight, brickWidth } = this.brickConfig;\n        for (let row = 0; row < level1.length; row++) {\n            for (let col = 0; col < level1[row].length; col++) {\n                const colorCode = level1[row][col];\n                bricks.push({\n                    x: this.wallSize + (brickWidth + brickGap) * col,\n                    y: this.wallSize + (brickHeight + brickGap) * row,\n                    color: this.colorMap[colorCode],\n                    width: brickWidth,\n                    height: brickHeight\n                });\n            }\n        }\n        bricks.forEach(brick => {\n            this.ctx.fillStyle = brick.color;\n            this.ctx?.fillRect(brick.x, brick.y, brick.width, brick.height);\n        });\n    }\n    // from mozilla gams\n    collides(ball, paddle) {\n        return ball.x < paddle.x + paddle.width &&\n            ball.x + ball.width > paddle.x &&\n            ball.y < paddle.y + paddle.height &&\n            ball.y + ball.height > paddle.y;\n    }\n    setListeners() {\n        document.addEventListener('keydown', (e) => {\n            // left arrow\n            if (e.keyCode === 37) {\n                this.paddle.dx = -3;\n            }\n            // right arrow\n            else if (e.keyCode === 39) {\n                this.paddle.dx = 3;\n            }\n            // space bar\n            if (this.ball.dx === 0 && this.ball.dy === 0 && e.keyCode === 32) {\n                this.ball.dx = this.ball.speed;\n                this.ball.dy = this.ball.speed;\n            }\n        });\n        // stop moving\n        document.addEventListener('keyup', (e) => {\n            if (e.keyCode === 37 || e.keyCode === 39) {\n                this.paddle.dx = 0;\n            }\n        });\n    }\n    startGame() {\n        requestAnimationFrame(() => this.startGame());\n        // clear canvas \n        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n        // move platform\n        this.paddle.x += this.paddle.dx;\n        if (this.paddle.x < this.wallSize) {\n            this.paddle.x = this.wallSize;\n        }\n        else if (this.paddle.x + this.brickConfig.brickWidth > this.canvas.width - this.wallSize) {\n            this.paddle.x = this.canvas.width - this.wallSize - this.brickConfig.brickWidth;\n        }\n        this.ctx.fillStyle = 'cyan';\n        this.ctx.fillRect(this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height);\n    }\n    init() {\n        // set canvas into html\n        const container = document.querySelector('#container');\n        container.innerHTML = '';\n        container.appendChild(this.canvas);\n        this.setBasicCanvasConfig();\n        this.setBricksOnCanvas();\n        this.setListeners();\n        requestAnimationFrame(() => this.startGame());\n    }\n}\nexports.Level = Level;\n\n\n//# sourceURL=webpack://arcanoid_by_ANDROid/./src/game/level.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst app_1 = __webpack_require__(/*! ./app */ \"./src/app.ts\");\n(0, app_1.app)();\n\n\n//# sourceURL=webpack://arcanoid_by_ANDROid/./src/index.ts?");

/***/ }),

/***/ "./src/startMenu.ts":
/*!**************************!*\
  !*** ./src/startMenu.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.showStartMenu = void 0;\nconst game_1 = __webpack_require__(/*! ./game/game */ \"./src/game/game.ts\");\nfunction showStartMenu(gameData) {\n    let appState = 'idle';\n    const containerEl = document.querySelector('#container');\n    const menuHTML = `\n\t\t<div class='menu__container'>\n\t\t\t<button class='menu__button'> Click to start </button>\n\t\t</div>\n\t`;\n    containerEl.innerHTML = menuHTML;\n    containerEl.addEventListener('click', () => {\n        if (appState !== 'idle')\n            return;\n        appState = 'inGame';\n        const game = new game_1.Game();\n    });\n}\nexports.showStartMenu = showStartMenu;\n\n\n//# sourceURL=webpack://arcanoid_by_ANDROid/./src/startMenu.ts?");

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