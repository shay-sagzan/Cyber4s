import {
  BoardData,
  WHITE_PLAYER,
  BLACK_PLAYER,
  BOARD_SIZE,
} from "./BoardData.js"
import { PAWN, ROOK, KNIGHT, BISHOP, KING, QUEEN } from "./BoardData.js"
import { GameManager } from "./GameManager.js"
import { boardData } from "./app.js"

export class Piece {
  constructor(row, col, color, type, src) {
    this.row = row
    this.col = col
    this.type = type
    this.color = color
    this.possibleMoves = []

    const createImg = (src) => {
      const img = document.createElement("img")
      img.src = src
      return img
    }
    this.piece = createImg(src)
  }

  getOpponent() {
    if (this.color === WHITE_PLAYER) {
      return BLACK_PLAYER
    }
    return WHITE_PLAYER
  }

  getPossibleMoves(boardData) {
    // Get relative moves
    let moves
    if (this.type === PAWN) {
      moves = this.getPawnMoves(boardData)
    } else if (this.type === ROOK) {
      moves = this.getRookMoves(boardData)
    } else if (this.type === KNIGHT) {
      moves = this.getKnightMoves(boardData)
    } else if (this.type === BISHOP) {
      moves = this.getBishopMoves(boardData)
    } else if (this.type === KING) {
      moves = this.getKingMoves(boardData)
    } else if (this.type === QUEEN) {
      moves = this.getQueenMoves(boardData)
    } else {
      console.log("Unknown type", type)
    }

    // Get filtered absolute moves
    let filteredMoves = []
    for (let absoluteMove of moves) {
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
    return filteredMoves
  }

  getMovesInDirection(directionRow, directionCol, boardData) {
    this.possibleMoves
    for (let i = 1; i < BOARD_SIZE; i++) {
      let row = this.row + directionRow * i
      let col = this.col + directionCol * i
      if (boardData.isEmpty(row, col)) {
        this.possibleMoves.push([row, col])
      } else if (boardData.isPlayer(row, col, this.getOpponent())) {
        this.possibleMoves.push([row, col])
        return this.possibleMoves
      } else if (boardData.isPlayer(row, col, this.color)) {
        return this.possibleMoves
      }
    }
    return this.possibleMoves
  }

  BishopMoves(boardData) {
    this.possibleMoves = []
    this.possibleMoves = this.possibleMoves.concat(
      this.getMovesInDirection(-1, -1, boardData)
    )
    this.possibleMoves = this.possibleMoves.concat(
      this.getMovesInDirection(-1, 1, boardData)
    )
    this.possibleMoves = this.possibleMoves.concat(
      this.getMovesInDirection(1, -1, boardData)
    )
    this.possibleMoves = this.possibleMoves.concat(
      this.getMovesInDirection(1, 1, boardData)
    )
    return this.possibleMoves
  }

  RookMoves(boardData) {
    this.possibleMoves = []
    this.possibleMoves = this.possibleMoves.concat(
      this.getMovesInDirection(-1, 0, boardData)
    )
    this.possibleMoves = this.possibleMoves.concat(
      this.getMovesInDirection(1, 0, boardData)
    )
    this.possibleMoves = this.possibleMoves.concat(
      this.getMovesInDirection(0, -1, boardData)
    )
    this.possibleMoves = this.possibleMoves.concat(
      this.getMovesInDirection(0, 1, boardData)
    )
    return this.possibleMoves
  }
}

export class Pawn extends Piece {
  constructor(row, col, color, type, src) {
    super(row, col, color, type, src)
  }

  getPawnMoves(boardData) {
    this.possibleMoves = []
    let direction = 1
    if (this.color === BLACK_PLAYER) {
      direction = -1
    }

    let position = [this.row + direction, this.col]
    if (boardData.isEmpty(position[0], position[1])) {
      this.possibleMoves.push(position)
    }

    position = [this.row + direction, this.col + direction]
    if (boardData.isPlayer(position[0], position[1], this.getOpponent())) {
      this.possibleMoves.push(position)
    }

    position = [this.row + direction, this.col - direction]
    if (boardData.isPlayer(position[0], position[1], this.getOpponent())) {
      this.possibleMoves.push(position)
    }

    return this.possibleMoves
  }
}

export class Queen extends Piece {
  constructor(row, col, color, type, src) {
    super(row, col, color, type, src)
  }
  getQueenMoves(boardData) {
    this.possibleMoves = this.BishopMoves(boardData)
    this.possibleMoves = this.possibleMoves.concat(this.RookMoves(boardData))
    return this.possibleMoves
  }
}

export class Bishop extends Piece {
  constructor(row, col, color, type, src) {
    super(row, col, color, type, src)
  }
  getBishopMoves(boardData) {
    this.possibleMoves = []
    return this.BishopMoves(boardData)
  }
}

export class Rook extends Piece {
  constructor(row, col, color, type, src) {
    super(row, col, color, type, src)
  }

  getRookMoves(boardData) {
    this.possibleMoves = []
    return this.RookMoves(boardData)
  }
}

export class King extends Piece {
  constructor(row, col, color, type, src) {
    super(row, col, color, type, src)
  }

  getKingMoves(boardData) {
    this.possibleMoves = []
    const relativeMoves = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ]
    for (let relativeMove of relativeMoves) {
      let row = this.row + relativeMove[0]
      let col = this.col + relativeMove[1]
      if (!boardData.isPlayer(row, col, this.color)) {
        this.possibleMoves.push([row, col])
      }
    }
    this.possibleMoves
  }
}

export class Knight extends Piece {
  constructor(row, col, color, type, src) {
    super(row, col, color, type, src)
  }
  getKnightMoves(boardData) {
    this.possibleMoves = []
    const relativeMoves = [
      [2, 1],
      [2, -1],
      [-2, 1],
      [-2, -1],
      [-1, 2],
      [1, 2],
      [-1, -2],
      [1, -2],
    ]
    for (let relativeMove of relativeMoves) {
      let row = this.row + relativeMove[0]
      let col = this.col + relativeMove[1]
      if (!boardData.isPlayer(row, col, this.color)) {
        this.possibleMoves.push([row, col])
      }
    }
    this.possibleMoves
  }
}
