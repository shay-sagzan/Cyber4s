import { GameManager } from "./GameManager.js"
import { BoardData } from "./BoardData.js"

const WHITE_PLAYER = "white"
const BLACK_PLAYER = "black"

const PAWN = "pawn"
const ROOK = "rook"
const KNIGHT = "knight"
const BISHOP = "bishop"
const KING = "king"
const QUEEN = "queen"

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

  getPossibleMoves(piece) {
    // Get relative moves
    let relativeMoves = []
    if (piece.type === PAWN) {
      relativeMoves = this.getPawnRelativeMoves()
    } else if (piece.type === ROOK) {
      relativeMoves = this.getRookRelativeMoves()
    } else if (piece.type === KNIGHT) {
      relativeMoves = this.getKnightRelativeMoves()
    } else if (piece.type === BISHOP) {
      relativeMoves = this.getBishopRelativeMoves()
    } else if (piece.type === KING) {
      relativeMoves = this.getKingRelativeMoves()
    } else if (piece.type === QUEEN) {
      relativeMoves = this.getQueenRelativeMoves()
    } else {
      console.log("Unknown type", piece.type)
    }
    console.log("relativeMoves", relativeMoves)

    // Get absolute moves
    let absoluteMoves = []
    for (let relativeMove of relativeMoves) {
      const absoluteRow = this.row + relativeMove[0]
      const absoluteCol = this.col + relativeMove[1]
      absoluteMoves.push([absoluteRow, absoluteCol])
    }
    // console.log('absoluteMoves', absoluteMoves);

    // Get filtered absolute moves
    let filteredMoves = []
    for (let absoluteMove of absoluteMoves) {
      const absoluteRow = absoluteMove[0]
      const absoluteCol = absoluteMove[1]
      if (
        absoluteRow >= 0 &&
        absoluteRow <= 7 &&
        absoluteCol >= 0 &&
        absoluteCol <= 7
      ) {
        filteredMoves.push(absoluteMove)
      }
    }
    console.log("filteredMoves", filteredMoves)
    return filteredMoves
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
