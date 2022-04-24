import { King, Knight, Pawn, Piece, Rook, Bishop, Queen } from "./Piece.js"
import { BoardData } from "./BoardData.js"
import { PAWN, ROOK, KNIGHT, BISHOP, KING, QUEEN } from "./BoardData.js"

const WHITE_PLAYER = "white"
const BLACK_PLAYER = "black"

export class GameManager {
  constructor() {
    this.blackPieces = []
    this.whitePieces = []
    this.createPieces()
  }

  createPieces() {
    this.blackPieces.push(
      new Rook(7, 7, BLACK_PLAYER, ROOK, "../images/black/rook.png")
    )
    this.blackPieces.push(
      new Knight(7, 6, BLACK_PLAYER, KNIGHT, "../images/black/knight.png")
    )
    this.blackPieces.push(
      new Bishop(7, 5, BLACK_PLAYER, BISHOP, "../images/black/bishop.png")
    )
    this.blackPieces.push(
      new Queen(7, 4, BLACK_PLAYER, QUEEN, "../images/black/queen.png")
    )
    this.blackPieces.push(
      new King(7, 3, BLACK_PLAYER, KING, "../images/black/king.png")
    )
    this.blackPieces.push(
      new Bishop(7, 2, BLACK_PLAYER, BISHOP, "../images/black/bishop.png")
    )
    this.blackPieces.push(
      new Knight(7, 1, BLACK_PLAYER, KNIGHT, "../images/black/knight.png")
    )
    this.blackPieces.push(
      new Rook(7, 0, BLACK_PLAYER, ROOK, "../images/black/rook.png")
    )
    for (let i = 0; i < 8; i++) {
      this.blackPieces.push(
        new Pawn(6, i, BLACK_PLAYER, PAWN, "../images/black/pawn.png")
      )
    }
    this.whitePieces.push(
      new Rook(0, 7, WHITE_PLAYER, ROOK, "../images/white/rook.png")
    )
    this.whitePieces.push(
      new Knight(0, 6, WHITE_PLAYER, KNIGHT, "../images/white/knight.png")
    )
    this.whitePieces.push(
      new Bishop(0, 5, WHITE_PLAYER, BISHOP, "../images/white/bishop.png")
    )
    this.whitePieces.push(
      new Queen(0, 4, WHITE_PLAYER, QUEEN, "../images/white/queen.png")
    )
    this.whitePieces.push(
      new King(0, 3, WHITE_PLAYER, KING, "../images/white/king.png")
    )
    this.whitePieces.push(
      new Bishop(0, 2, WHITE_PLAYER, BISHOP, "../images/white/bishop.png")
    )
    this.whitePieces.push(
      new Knight(0, 1, WHITE_PLAYER, KNIGHT, "../images/white/knight.png")
    )
    this.whitePieces.push(
      new Rook(0, 0, WHITE_PLAYER, ROOK, "../images/white/rook.png")
    )
    for (let i = 0; i < 8; i++) {
      this.whitePieces.push(
        new Pawn(1, i, WHITE_PLAYER, PAWN, "../images/white/pawn.png")
      )
    }
    this.whiteKing = this.whitePieces.find((p) => p.type === "k")
    this.blackKing = this.blackPieces.find((p) => p.type === "k")
  }

  render() {
    this.blackPieces.forEach((piece) => {
      piece.render()
    })
    this.whitePieces.forEach((piece) => {
      piece.render()
    })
  }
}
