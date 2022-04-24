import { Table } from "./Table"
import { King, Knight, Pawn, Piece, Rook, Bishop, Queen } from "./Piece.js"
import { GameManager } from "./GameManager.js"

const newMoves = new Piece()
const game = new GameManager()
const table = new Table([...game.blackPieces, ...game.whitePieces])

// console.log(newMoves);
// window.addEventListener("load", createChessBoard())
