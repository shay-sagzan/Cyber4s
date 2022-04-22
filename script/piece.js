import { GameManager } from "./GameManager.js"
import { BoardData } from "./BoardData.js"

export class Piece {
  constructor(row, col, cell, type, player, img) {
    this.row = row
    this.col = col
    this.cell = cell
    this.type = type
    this.player = player
    this.img = this.addImage(cell, player, name)
    this.alive = true
    this.possibleMoves = []
    this.firstTurn = true
    this.oldCol = col
    this.oldRow = row
    this.oldPossibleMoves = [...this.possibleMoves]
    this.el.classList.add("chess-piece")

    this.el.addEventListener("click", (e) => {
      e.stopPropagation()
      this.click()
    })
  }

  getPossibleMoves() {
    // Get relative moves
    let relativeMoves
    if (this.type === PAWN) {
      relativeMoves = this.getPawnRelativeMoves()
    } else if (this.type === ROOK) {
      relativeMoves = this.getRookRelativeMoves()
    } else if (this.type === KNIGHT) {
      relativeMoves = this.getKnightRelativeMoves()
    } else if (this.type === BISHOP) {
      relativeMoves = this.getBishopRelativeMoves()
    } else if (this.type === KING) {
      relativeMoves = this.getKingRelativeMoves()
    } else if (this.type === QUEEN) {
      relativeMoves = this.getQueenRelativeMoves()
    } else {
      console.log("Unknown type", type)
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

  getPawnRelativeMoves() {
    let direction = 1
    if (this.player === BLACK_PLAYER) {
      direction = -1
    }
    return [[1 * direction, 0]]
  }

  getQueenRelativeMoves() {
    let result = []
    for (let i = 1; i < BOARD_SIZE; i++) {
      result.push([i, 0])
      result.push([-i, 0])
      result.push([0, i])
      result.push([0, -i])
      result.push([i, -i])
      result.push([i, i])
      result.push([-i, i])
      result.push([-i, -i])
    }
    return result
  }

  getBishopRelativeMoves() {
    let result = []
    for (let i = 1; i < BOARD_SIZE; i++) {
      result.push([i, -i])
      result.push([i, i])
      result.push([-i, i])
      result.push([-i, -i])
    }
    return result
  }

  getRookRelativeMoves() {
    let result = []
    for (let i = 1; i < BOARD_SIZE; i++) {
      result.push([i, 0])
      result.push([-i, 0])
      result.push([0, i])
      result.push([0, -i])
    }
    return result
  }

  getKingRelativeMoves() {
    let result = []
    for (let row = -1; row <= 1; row++) {
      for (let col = -1; col <= 1; col++) {
        if (!(row === 0 && col === 0)) {
          result.push([row, col])
        }
      }
    }
    return result
  }

  getKnightRelativeMoves() {
    let result = []
    for (let i = 1; i < BOARD_SIZE; i++) {
      result.push([-2, -1])
      result.push([-1, -2])
      result.push([1, -2])
      result.push([2, -1])
      result.push([2, 1])
      result.push([1, 2])
      result.push([-1, 2])
      result.push([-2, 1])
    }
    return result
  }

  addImage(cell, player, name) {
    const image = document.createElement("img")
    image.src = "../images/" + player + "/" + name + ".png"
    cell.appendChild(image)
    image.setAttribute("id", "chess-piece")
  }
}
