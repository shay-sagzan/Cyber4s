import { BoardData } from "./BoardData.js"
import { King, Knight, Pawn, Piece, Rook, Bishop, Queen } from "./Piece.js"
import { GameManager } from "./GameManager.js"
import { Utilities } from "./Utilities.js"

const newMoves = new Piece()
const util = new Utilities()
const game = new GameManager()
export const boardData = new BoardData([
  ...game.blackPieces,
  ...game.whitePieces,
])

// window.addEventListener("load", boardData.initGame())
