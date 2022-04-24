import { BoardData } from "./boardData.js"
import { Piece } from "./Piece.js"
import { GameManager } from "./GameManager.js"

const newMoves = new Piece()
const game = new GameManager()
const boardData = new BoardData([...game.blackPieces, ...game.whitePieces])

// console.log(newMoves);
// window.addEventListener("load", createChessBoard())
