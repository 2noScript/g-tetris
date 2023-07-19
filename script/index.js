const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;
const COLORS = [
  "red",
  "orange",
  "green",
  "purple",
  "blue",
  "cyan",
  "yellow",
  "white",
];

const WHITE_COLOR_ID = 7;

const BRICK = [
  [
    [1, 7, 7],
    [1, 1, 1],
    [7, 7, 7],
  ],
  [
    [7, 1, 7],
    [7, 1, 7],
    [7, 1, 1],
  ],
  [
    [1, 7, 7],
    [1, 1, 7],
    [7, 1, 7],
  ],
  [
    [7, 1, 7],
    [1, 1, 7],
    [1, 7, 7],
  ],
  [
    [7, 7, 7, 7],
    [1, 1, 1, 1],
    [7, 7, 7, 7],
    [7, 7, 7, 7],
  ],
  [
    [7, 7, 7, 7],
    [7, 1, 1, 7],
    [7, 1, 1, 7],
    [7, 7, 7, 7],
  ],
  [
    [7, 1, 7],
    [1, 1, 1],
    [7, 7, 7],
  ],
];

const canvas = $("#board");
const ctx = canvas.getContext("2d");

class Tetris {
  constructor(_ctx) {
    this.ctx = ctx;
  }
  drawCell(xAxis, yAxis, colorId) {
    const x = xAxis * BLOCK_SIZE;
    const y = yAxis * BLOCK_SIZE;
    this.ctx.fillStyle = COLORS[colorId];
    this.ctx.fillRect(x, y, BLOCK_SIZE, BLOCK_SIZE);
    this.ctx.strokeRect(x, y, BLOCK_SIZE, BLOCK_SIZE);
  }
  drawBoard() {
    this.ctx.canvas.width = COLS * BLOCK_SIZE;
    this.ctx.canvas.height = ROWS * BLOCK_SIZE;
    for (let col = 0; col < COLS; col++) {
      for (let row = 0; row < ROWS; row++) {
        this.drawCell(col, row, WHITE_COLOR_ID);
      }
    }
  }
  rotate90(arr) {
    const rows = arr.length;
    const cols = arr[0].length;
    for (let i = 0; i < rows; i++) {
      for (let j = i; j < cols; j++) {
        [arr[i][j], arr[j][i]] = [arr[j][i], arr[i][j]];
      }
    }
    for (let i = 0; i < rows; i++) {
      arr[i] = arr[i].reverse();
    }
    return arr;
  }
  rotateArrayCounter90(arr) {
    const rows = arr.length;
    const cols = arr[0].length;

    const rotatedArr = [];

    for (let j = cols - 1; j >= 0; j--) {
      const row = [];
      for (let i = 0; i < rows; i++) {
        row.push(arr[i][j]);
      }
      rotatedArr.push(row);
    }

    return rotatedArr;
  }

  renderBrick(brick) {
    brick.forEach((it, row) => {
      it.forEach((color_id, col) => {
        // console.log(color_id);
        if (color_id !== WHITE_COLOR_ID) {
          this.drawCell(col, row, color_id);
        }
      });
    });
  }

  drawBrick(id, deg) {
    const brick = BRICK[id];
    if (deg === 90) {
      this.renderBrick(this.rotate90(brick));
    } else if (deg === 180) {
      const brick90 = this.rotate90(brick);
      const brick180 = this.rotate90(brick90);
      const brick270 = this.rotate90(brick180);
      this.renderBrick(brick270);
    }
  }
}
const tetris = new Tetris(ctx);

tetris.drawBoard();
tetris.drawBrick(0, 180);

function app() {}
