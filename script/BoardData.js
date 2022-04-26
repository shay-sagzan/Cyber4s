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

const CHESS_BOARD_ID = "chess-board"

let table
let selectedPiece

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

  tryMove(piece, row, col) {
    const possibleMoves = piece.getPossibleMoves(boardData)
    // possibleMoves looks like this: [[1,2], [3,2]]
    for (const possibleMove of possibleMoves) {
      // possibleMove looks like this: [1,2]
      if (possibleMove[0] === row && possibleMove[1] === col) {
        // There is a legal move
        boardData.removePiece(row, col)
        piece.row = row
        piece.col = col
        return true
      }
    }
    return false
  }

  isEmpty(row, col) {
    return this.getPiece(row, col) === undefined
  }

  isPlayer(row, col, color) {
    const piece = this.getPiece(row, col)
    return piece !== undefined && piece.color === color
  }

  tryUpdateSelectedPiece(row, col) {
    // Clear all previous possible moves
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        table.rows[i].cells[j].classList.remove("possible-move")
        table.rows[i].cells[j].classList.remove("selected")
      }
    }

    // Show possible moves
    const piece = boardData.getPiece(row, col)
    if (piece !== undefined) {
      let possibleMoves = piece.getPossibleMoves(boardData)
      for (let possibleMove of possibleMoves) {
        const cell = table.rows[possibleMove[0]].cells[possibleMove[1]]
        cell.classList.add("possible-move")
      }
    }

    table.rows[row].cells[col].classList.add("selected")
    selectedPiece = piece
  }

  onCellClick(event, row, col) {
    // selectedPiece - The current selected piece (selected in previous click)
    // row, col - the currently clicked cell - it may be empty, or have a piece.
    if (selectedPiece !== undefined && this.tryMove(selectedPiece, row, col)) {
      selectedPiece = undefined
      // Recreate whole board - this is not efficient, but doesn't affect user experience
      this.createChessBoard(boardData)
    } else {
      this.tryUpdateSelectedPiece(row, col)
    }
  }

  createChessBoard() {
    table = document.getElementById(CHESS_BOARD_ID)
    if (table !== null) {
      table.remove()
    }

    table = document.createElement("table")
    table.id = CHESS_BOARD_ID
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
  }

  initGame() {
    // Create list of pieces (32 total)
    boardData = new BoardData(getInitialPieces())
    createChessBoard(boardData)
  }
}
