import { BoardData } from "./BoardData.js"
import { King, Knight, Pawn, Piece, Rook, Bishop, Queen } from "./Piece.js"
import { GameManager } from "./GameManager.js"

const newMoves = new Piece()
const game = new GameManager()
export const boardData = new BoardData([
  ...game.blackPieces,
  ...game.whitePieces,
])
