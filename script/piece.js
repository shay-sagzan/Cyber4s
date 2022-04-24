import { GameManager } from "./GameManager.js"
import { BoardData } from "./BoardData.js"

const WHITE_PLAYER = "white"
const BLACK_PLAYER = "black"

export class Piece {
  constructor(row, col, color, type, src) {
    this.row = row
    this.col = col
    this.type = type
    this.color = color
    this.alive = true
    this.possibleMoves = []
    this.firstTurn = true
    this.oldCol = col
    this.oldRow = row
    this.oldPossibleMoves = [...this.possibleMoves]

    const createImg = (src) => {
      const img = document.createElement("img")
      img.src = src
      return img
    }
    this.el = createImg(src)
  }

  isChar() {
    if (charData[this.row][this.col] !== undefined) {
      return charData[this.row][this.col]
    } else return undefined
  }

  isClear(row, col) {
    const char = this.isChar()
    if (
      row >= 0 &&
      col >= 0 &&
      row < 8 &&
      col < 8 &&
      charData[row][col] !== undefined
    ) {
      return false
    } else return true
  }
}

export class Pawn extends Piece {
  constructor(row, col, color, type, src) {
    super(row, col, color, type, src)
  }

  getPawnRelativeMoves() {
    this.possibleMoves = []
    if (this.type === BLACK_PLAYER) {
      let direction = -1
      if (this.firstTurn) {
      }
    }
  }
}

export class Queen extends Piece {
  constructor(row, col, color, type, src) {
    super(row, col, color, type, src)
  }
  getQueenRelativeMoves() {
    let arr = []
    for (let i = 1; i < 8; i++) {
      arr.push([i, i])
      if (this.isClear(char.row + i, char.col + i) === false) break
    }
    for (let i = 1; i < 8; i++) {
      arr.push([i, -i])
      if (this.isClear(char.row + i, char.col - i) === false) break
    }
    for (let i = 1; i < 8; i++) {
      arr.push([-i, i])
      if (this.isClear(char.row - i, char.col + i) === false) break
    }
    for (let i = 1; i < 8; i++) {
      arr.push([-i, -i])
      if (this.isClear(char.row - i, char.col - i) === false) break
    }
    for (let i = 1; i < 8; i++) {
      arr.push([i, 0])
      if (this.isClear(char.row + i, char.col) === false) break
    }
    for (let i = 1; i < 8; i++) {
      arr.push([0, i])
      if (this.isClear(char.row, char.col + i) === false) break
    }
    for (let i = 1; i < 8; i++) {
      arr.push([-i, 0])
      if (this.isClear(char.row - i, char.col) === false) break
    }
    for (let i = 1; i < 8; i++) {
      arr.push([0, -i])
      if (this.isClear(char.row, char.col - i) === false) break
    }
    return arr
  }
}

export class Bishop extends Piece {
  constructor(row, col, color, type, src) {
    super(row, col, color, type, src)
  }
  getBishopRelativeMoves() {
    let arr = []
    for (let i = 1; i < 8; i++) {
      arr.push([i, i])
      if (this.isClear(char.row + i, char.col + i) === false) break
    }
    for (let i = 1; i < 8; i++) {
      arr.push([i, -i])
      if (this.isClear(char.row + i, char.col - i) === false) break
    }
    for (let i = 1; i < 8; i++) {
      arr.push([-i, i])
      if (this.isClear(char.row - i, char.col + i) === false) break
    }
    for (let i = 1; i < 8; i++) {
      arr.push([-i, -i])
      if (this.isClear(char.row - i, char.col - i) === false) break
    }
    return arr
  }
}

export class Rook extends Piece {
  constructor(row, col, color, type, src) {
    super(row, col, color, type, src)
  }

  getRookRelativeMoves() {
    let arr = []
    for (let i = 1; i < 8; i++) {
      arr.push([i, 0])
      if (this.isClear(char.row + i, char.col) === false) break
    }
    for (let i = 1; i < 8; i++) {
      arr.push([0, i])
      if (this.isClear(char.row, char.col + i) === false) break
    }
    for (let i = 1; i < 8; i++) {
      arr.push([-i, 0])
      if (this.isClear(char.row - i, char.col) === false) break
    }
    for (let i = 1; i < 8; i++) {
      arr.push([0, -i])
      if (this.isClear(char.row, char.col - i) === false) break
    }
    return arr
  }
}

export class King extends Piece {
  constructor(row, col, color, type, src) {
    super(row, col, color, type, src)
  }

  getKingRelativeMoves() {
    let arr = []
    for (let row = -1; row <= 1; row++) {
      for (let col = -1; col <= 1; col++) {
        if (!(row === 0 && col === 0)) {
          arr.push([row, col])
        }
      }
    }
    return arr
  }
}

export class Knight extends Piece {
  constructor(row, col, color, type, src) {
    super(row, col, color, type, src)
  }
  getKnightRelativeMoves() {
    let arr = []
    for (let i = 1; i < BOARD_SIZE; i++) {
      arr.push([-2, -1])
      arr.push([-1, -2])
      arr.push([1, -2])
      arr.push([2, -1])
      arr.push([2, 1])
      arr.push([1, 2])
      arr.push([-1, 2])
      arr.push([-2, 1])
    }
    return arr
  }
}
