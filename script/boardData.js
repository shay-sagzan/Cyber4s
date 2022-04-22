const PAWN = "pawn"
const ROOK = "rook"
const KNIGHT = "knight"
const BISHOP = "bishop"
const KING = "king"
const QUEEN = "queen"

const BOARD_SIZE = 8

class BoardData {
  constructor() {
    this._cells = document.getElementsByClassName("cell")
    this._active = null
    this.initCells()
  }

  get active() {
    return this._active
  }

  removeActive() {
    this._active = null
  }

  set active(newActiveChessPiece) {
    if (!newActiveChessPiece) throw "Active needs to have a value"
    this._active = newActiveChessPiece
  }

  removeActive() {
    this._active = null
  }

  // Returns piece in row, col, or undefined if not exists.
  // getPiece(row, col) {
  //   for (const piece of this.pieces) {
  //     if (piece.row === row && piece.col === col) {
  //       return piece
  //     }
  //   }
  // }

  // getType(type) {
  //   for (const piece of this.pieces) {
  //     if (
  //       this.type === KNIGHT ||
  //       this.type === ROOK ||
  //       this.type === KING ||
  //       this.type === BISHOP ||
  //       this.type === QUEEN ||
  //       this.type === PAWN
  //     )
  //       console.log("work")
  //     return type
  //   }
  // }

  // getColor() {
  //   for (const piece of this.pieces) {
  //     if (typeof getPiece() === WHITE_PLAYER) {
  //       console.log("white")
  //       return true
  //     } else {
  //       console.log("piece")
  //       return false
  //     }
  //   }
  // }

  initCells() {
    for (let i = 0; i < this._cells.length; i++) {
      const element = this._cells[i]
      const col = i % BOARD_SIZE
      const row = parseInt(i / BOARD_SIZE)
      element.addEventListener("click", (e) => {
        if (this.active) {
          this.active.play(row, col)
          if (gm.isCheck() === this.active.color) {
            console.log("revert")
            this.active.revert()
          } else {
            gm.turn()
          }
          this.active.deactivate()
          console.log(gm)
        }
      })
    }
  }
}
