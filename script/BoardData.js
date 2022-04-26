import { GameManager } from "./GameManager.js"
import { Piece } from "./Piece.js"
import { boardData } from "./app.js"

export const BOARD_SIZE = 8
export const WHITE_PLAYER = "white"
export const BLACK_PLAYER = "black"

export const PAWN = "pawn"
export const ROOK = "rook"
export const KNIGHT = "knight"
export const BISHOP = "bishop"
export const KING = "king"
export const QUEEN = "queen"

let table
let selectedCell

export class BoardData {
  constructor(pieces) {
    this.pieces = pieces
    this.cells = document.getElementsByClassName("cell")
    this.createChessBoard()
  }

  clearBoard(table) {
    for (let i = 0; i < BOARD_SIZE; i++) {
      // clear all signs
      for (let j = 0; j < BOARD_SIZE; j++) {
        table.rows[i].cells[j].classList.remove("possible-move")
        table.rows[i].cells[j].classList.remove("selected")
      }
    }
  }

  getPiece(row, col) {
    for (const piece of this.pieces) {
      if (piece.row === row && piece.col === col) {
        return piece
      }
    }
  }

  removePiece(row, col) {
    for (let i = 0; i < this.pieces.length; i++) {
      const piece = this.pieces[i]
      if (piece.row === row && piece.col === col) {
        // Remove piece at index i
        this.pieces.splice(i, 1)
      }
    }
  }

  getCell(index) {
    return this.cells[index]
  }

  getCell(row, col) {
    let index = row * 8 + col
    return this.cells[index]
  }

  isEmpty(row, col) {
    return this.getPiece(row, col) === undefined
  }

  isPlayer(row, col, color) {
    const piece = this.getPiece(row, col)
    return piece !== undefined && piece.color === color
  }

  onCellClick(event, row, col) {
    // Clear all previous possible moves
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        table.rows[i].cells[j].classList.remove("possible-move")
      }
    }

    // Show possible moves
    const piece = this.getPiece(row, col)
    if (piece !== undefined) {
      let possibleMoves = piece.getPossibleMoves(boardData)
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
        if ((row + col) % 2 === 0) {
          cell.className = "light-cell"
        } else {
          cell.className = "dark-cell"
        }
        if (this.getPiece(row, col))
          cell.appendChild(this.getPiece(row, col).piece)
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

    const btnSwitchPlayer = document.createElement("button")
    btnSwitchPlayer.innerText = "Switch Players"
    document.body.appendChild(btnSwitchPlayer)
    btnSwitchPlayer.classList.add("btnSwitchPlayer")
  }
}

// window.addEventListener("load", createChessBoard)
