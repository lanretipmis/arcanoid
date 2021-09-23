"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.Level = void 0;
var defaultCanvasSetting = {
    width: 400,
    height: 500,
    borderColor: '#000000'
};
var level1 = [
    [],
    [],
    [],
    [],
    [],
    [],
    ['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'],
    ['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'],
    ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
    ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
    ['G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G'],
    ['G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G'],
    ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y'],
    ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y']
];
var Level = /** @class */ (function () {
    function Level() {
        this.map = level1;
        this.canvasConfig = __assign(__assign({}, defaultCanvasSetting), { bgImgSrc: '../../sprites/bg-2.png' });
        // view configs
        this.colorMap = {
            'R': 'red',
            'O': 'orange',
            'G': 'green',
            'Y': 'yellow'
        };
        this.brickConfig = {
            brickGap: 2,
            brickWidth: 25,
            brickHeight: 12
        };
        this.wallSize = 12;
        this.paddle = {
            // ставим её внизу по центру поля
            x: this.canvasConfig.width / 2 - this.brickConfig.brickWidth / 2,
            y: 440,
            width: this.brickConfig.brickWidth,
            height: this.brickConfig.brickHeight,
            dx: 0
        };
        this.ball = {
            x: 130,
            y: 260,
            width: 5,
            height: 5,
            speed: 2,
            dx: 0,
            dy: 0
        };
        var canvas = document.createElement('canvas');
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.init();
    }
    Level.prototype.setBasicCanvasConfig = function () {
        // TODO bg img		
        this.canvas.width = this.canvasConfig.width;
        this.canvas.height = this.canvasConfig.height;
        if (!this.ctx)
            return;
        this.ctx.fillStyle = this.canvasConfig.borderColor;
        this.ctx.fillRect(0, 0, this.canvas.width, 12);
        this.ctx.fillRect(0, 0, 12, this.canvas.height);
        this.ctx.fillRect(this.canvas.width - 12, 0, 12, this.canvas.height);
    };
    Level.prototype.setBricksOnCanvas = function () {
        var _this = this;
        var bricks = [];
        var _a = this.brickConfig, brickGap = _a.brickGap, brickHeight = _a.brickHeight, brickWidth = _a.brickWidth;
        for (var row = 0; row < level1.length; row++) {
            for (var col = 0; col < level1[row].length; col++) {
                var colorCode = level1[row][col];
                bricks.push({
                    x: this.wallSize + (brickWidth + brickGap) * col,
                    y: this.wallSize + (brickHeight + brickGap) * row,
                    color: this.colorMap[colorCode],
                    width: brickWidth,
                    height: brickHeight
                });
            }
        }
        bricks.forEach(function (brick) {
            var _a;
            _this.ctx.fillStyle = brick.color;
            (_a = _this.ctx) === null || _a === void 0 ? void 0 : _a.fillRect(brick.x, brick.y, brick.width, brick.height);
        });
    };
    // from mozilla gams
    Level.prototype.collides = function (ball, paddle) {
        return ball.x < paddle.x + paddle.width &&
            ball.x + ball.width > paddle.x &&
            ball.y < paddle.y + paddle.height &&
            ball.y + ball.height > paddle.y;
    };
    Level.prototype.setListeners = function () {
        var _this = this;
        document.addEventListener('keydown', function (e) {
            // left arrow
            if (e.keyCode === 37) {
                _this.paddle.dx = -3;
            }
            // right arrow
            else if (e.keyCode === 39) {
                _this.paddle.dx = 3;
            }
            // space bar
            if (_this.ball.dx === 0 && _this.ball.dy === 0 && e.keyCode === 32) {
                _this.ball.dx = _this.ball.speed;
                _this.ball.dy = _this.ball.speed;
            }
        });
        // как только игрок перестал нажимать клавиши со стрелками — останавливаем платформу
        document.addEventListener('keyCodeup', function (e) {
            if (e.keyCode === 37 || e.keyCode === 39) {
                paddle.dx = 0;
            }
        });
    };
    Level.prototype.init = function () {
        // set canvas into html
        var container = document.querySelector('#container');
        container.innerHTML = '';
        container.appendChild(this.canvas);
        this.setBasicCanvasConfig();
        this.setBricksOnCanvas();
        this.setListeners();
    };
    return Level;
}());
exports.Level = Level;
