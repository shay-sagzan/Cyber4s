import { King, Knight, Pawn, Piece, Rook, Bishop, Queen } from "./Piece.js"
import { GameManager } from "./GameManager.js"

export const PAWN = "pawn"
export const ROOK = "rook"
export const KNIGHT = "knight"
export const BISHOP = "bishop"
export const KING = "king"
export const QUEEN = "queen"

const BOARD_SIZE = 8
let table
let selectedCell

export class Table {
  constructor(pieces) {
    this.pieces = pieces
    this._cells = document.getElementsByClassName("cell")
    this.createChessBoard()
  }

  getPiece(row, col) {
    return this.pieces.find((el) => {
      if (el.row === row && el.col === col) return el
    })
  }

  getCell(index) {
    return this._cells[index]
  }

  getCell(row, col) {
    let index = row * 8 + col
    return this._cells[index]
  }

  onCellClick(e, row, col) {
    // console.log("row" + row)
    // console.log("col" + col)
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        table.rows[i].cells[j].classList.remove("possible-move")
      }
    }
    const el = this.getPiece(row, col).type
    if (el !== undefined) {
      for (let possibleMove of this.getPossibleMoves(el)) {
        const cell = table.rows[possibleMove[0]].cells[possibleMove[1]]
        cell.classList.add("possible-move")
      }
    }

    // Clear previously selected cell
    if (selectedCell !== undefined) {
      selectedCell.classList.remove("selected")
    }

    // Show selected cell
    selectedCell = e.currentTarget
    selectedCell.classList.add("selected")
  }

  getPossibleMoves(piece) {
    // Get relative moves
    let relativeMoves = []
    if (piece.type === PAWN) {
      relativeMoves = getPawnRelativeMoves()
    } else if (piece.type === ROOK) {
      relativeMoves = getRookRelativeMoves()
    } else if (piece.type === KNIGHT) {
      relativeMoves = getKnightRelativeMoves()
    } else if (piece.type === BISHOP) {
      relativeMoves = getBishopRelativeMoves()
    } else if (piece.type === KING) {
      relativeMoves = getKingRelativeMoves()
    } else if (piece.type === QUEEN) {
      relativeMoves = getQueenRelativeMoves()
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

        console.log(this.getPiece(row, col))
        // I call the getPiece method to find the piece and create
        // in the cur place
        if (this.getPiece(row, col))
          cell.appendChild(this.getPiece(row, col).el)

        cell.addEventListener("click", (e) => this.onCellClick(e, row, col))
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
    btnReset.addEventListener("click", () => getInitialPieces)

    const btnSwitchPlayer = document.createElement("button")
    btnSwitchPlayer.innerText = "Switch Players"
    document.body.appendChild(btnSwitchPlayer)
    btnSwitchPlayer.classList.add("btnSwitchPlayer")
  }
}
