import { GameManager } from "./GameManager.js"
import { King, Knight, Pawn, Piece, Rook } from "./Piece.js"

const PAWN = "pawn"
const ROOK = "rook"
const KNIGHT = "knight"
const BISHOP = "bishop"
const KING = "king"
const QUEEN = "queen"

const BOARD_SIZE = 8
let selectedCell
let table

export class BoardData {
  constructor(pieces) {
    this.pieces = pieces
    this._cells = document.getElementsByClassName("cell")
    this.createChessBoard()
  }

  getCell(index) {
    return this._cells[index]
  }

  getCell(row, col) {
    let index = row * 8 + col
    return this._cells[index]
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

  onCellClick(event, row, col) {
    console.log("row", row)
    console.log("col", col)
    // Clear all previous possible moves
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        table.rows[i].cells[j].classList.remove("possible-move")
      }
    }
    const piece = boardData.getPiece(row, col)
    if (piece !== undefined) {
      let possibleMoves = piece.getPossibleMoves()
      for (let possibleMove of possibleMoves) {
        const cell = table.rows[possibleMove[0]].cells[possibleMove[1]]
        cell.classList.add("possible-move")
      }
    }

    // Clear previously selected cell
    if (selectedCell !== undefined) {
      selectedCell.classList.remove("selected")
    }

    // Show selected cell
    selectedCell = event.currentTarget
    selectedCell.classList.add("selected")
  }

  createChessBoard() {
    // Create empty chess board HTML:
    table = document.createElement("table")
    document.body.appendChild(table)
    for (let row = 0; row < BOARD_SIZE; row++) {
      const rowElement = table.insertRow()
      for (let col = 0; col < BOARD_SIZE; col++) {
        const cell = rowElement.insertCell()
        rowElement.appendChild(cell)
        cell.id = "cell-" + row.toString() + "_" + col.toString()
        if ((row + col) % 2 === 0) {
          cell.className = "light-cell"
        } else {
          cell.className = "dark-cell"
        }
        cell.addEventListener("click", (event) =>
          this.onCellClick(event, row, col)
        )
      }
    }

    const h1 = document.createElement("h1")
    h1.innerText = "Chess-Board Game!"
    document.body.appendChild(h1)
    h1.classList.add("header")

    const btnReset = document.createElement("button")
    btnReset.innerText = "Reset"
    document.body.appendChild(btnReset)
    btnReset.classList.add("btnReset")
    btnReset.addEventListener("click", (event) => getInitialPieces)

    const btnSwitchPlayer = document.createElement("button")
    btnSwitchPlayer.innerText = "Switch Players"
    document.body.appendChild(btnSwitchPlayer)
    btnSwitchPlayer.classList.add("btnSwitchPlayer")
  }
}
