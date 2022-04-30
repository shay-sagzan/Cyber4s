const BOARD_SIZE = 8
const WHITE_PLAYER = "white"
const BLACK_PLAYER = "black"

const PAWN = "pawn"
const ROOK = "rook"
const KNIGHT = "knight"
const BISHOP = "bishop"
const KING = "king"
const QUEEN = "queen"

const PIECES = [ROOK, KNIGHT, BISHOP, KING, QUEEN, BISHOP, KNIGHT, ROOK]

const CHESS_BOARD_ID = "chess-board"

let game
let table
let resetBtn
let selectedPiece
let eatenBlackPieces
let eatenWhitePieces

function tryUpdateSelectedPiece(row, col) {
  // Clear all previous possible moves
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      table.rows[i].cells[j].classList.remove("possible-move")
      table.rows[i].cells[j].classList.remove("selected")
    }
  }

  // Show possible moves
  const piece = game.boardData.getPiece(row, col)
  if (piece !== undefined) {
    let possibleMoves = game.getPossibleMoves(piece)
    for (let possibleMove of possibleMoves) {
      const cell = table.rows[possibleMove[0]].cells[possibleMove[1]]
      cell.classList.add("possible-move")
    }
  }

  table.rows[row].cells[col].classList.add("selected")
  selectedPiece = piece
}

function onCellClick(row, col) {
  // selectedPiece - The current selected piece (selected in previous click)
  // row, col - the currently clicked cell - it may be empty, or have a piece.
  if (selectedPiece !== undefined && game.tryMove(selectedPiece, row, col)) {
    selectedPiece = undefined
    // Recreate whole board - this is not efficient, but doesn't affect user experience
    createChessBoard(game.boardData)
    if (game.endOfTheGame() === false) checkIfCheck()
  } else {
    tryUpdateSelectedPiece(row, col)
  }
}

/*
  this function check if there is a check on the king.
  the function find the pieces of the previous player has on the board,
  she get array of possible moves for each soldier who played last,
  and find the oponnent King's Location(row, col).
  Then, she check if one of the possible moves of the last player is Check.
*/
function checkIfCheck() {
  let piecesPreviousPlayer = []
  for (let piece of game.boardData.pieces) {
    if (piece.getOpponent() === game.currentPlayer) {
      piecesPreviousPlayer.push(piece)
    }
  }

  let possiblePlayerMoves = []
  for (let piece of piecesPreviousPlayer) {
    possiblePlayerMoves = possiblePlayerMoves.concat(
      piece.getPossibleMoves(game.boardData)
    )
  }

  let kingCell
  for (let opponentCell of game.boardData.pieces) {
    if (
      opponentCell.type === KING &&
      opponentCell.player === game.currentPlayer
    ) {
      kingCell = [opponentCell.row, opponentCell.col]
    }
  }

  for (let i = 0; i < possiblePlayerMoves.length; i++) {
    if (
      possiblePlayerMoves[i][0] === kingCell[0] &&
      possiblePlayerMoves[i][1] === kingCell[1]
    ) {
      const check = document.createElement("h3")
      check.classList.add("checkPos")
      check.textContent = "Check!"
      document.body.appendChild(check)
      return true
    }
  }
}

// Adds an image to cell with the piece's image
function addImage(cell, player, name) {
  const image = document.createElement("img")
  image.src = "images/" + player + "/" + name + ".png"
  image.draggable = false
  cell.appendChild(image)
}

function createChessBoard(boardData) {
  table = document.getElementById(CHESS_BOARD_ID)
  if (table !== null) {
    table.remove()
  }

  // Create empty chess board HTML:
  table = document.createElement("table")
  table.id = CHESS_BOARD_ID
  document.body.appendChild(table)
  for (let row = 0; row < BOARD_SIZE; row++) {
    const rowElement = table.insertRow()
    for (let col = 0; col < BOARD_SIZE; col++) {
      const cell = rowElement.insertCell()
      if ((row + col) % 2 === 0) {
        cell.className = "light-cell"
      } else {
        cell.className = "dark-cell"
      }
      cell.addEventListener("click", () => onCellClick(row, col))
    }
  }

  // Add pieces images to board
  for (let piece of boardData.pieces) {
    const cell = table.rows[piece.row].cells[piece.col]
    addImage(cell, piece.player, piece.type)
  }

  if (game.winner !== undefined) {
    const winnerPopup = document.createElement("div")
    // black -> B + lack -> Black
    const winner = game.winner.charAt(0).toUpperCase() + game.winner.slice(1)
    winnerPopup.textContent = winner + " player wins!"
    winnerPopup.classList.add("winner-dialog")
    table.appendChild(winnerPopup)
  }
}

function initGame() {
  const header = document.createElement("h1")
  header.classList.add("header")
  header.textContent = "Chess-Game!"
  document.body.appendChild(header)

  eatenWhitePieces = document.createElement("div")
  eatenWhitePieces.classList.add("eatenWhitePieces")
  document.body.appendChild(eatenWhitePieces)
  let subHeaderWhite = document.createElement("h3")
  subHeaderWhite.classList.add("sub-header")
  subHeaderWhite.textContent = "White Piece Eaten!"
  eatenWhitePieces.appendChild(subHeaderWhite)

  eatenBlackPieces = document.createElement("div")
  eatenBlackPieces.classList.add("eatenBlackPieces")
  document.body.appendChild(eatenBlackPieces)
  let subHeaderBlack = document.createElement("h3")
  subHeaderBlack.classList.add("sub-header")
  subHeaderBlack.textContent = "Black Piece Eaten!"
  eatenBlackPieces.appendChild(subHeaderBlack)

  resetBtn = document.createElement("button")
  resetBtn.classList.add("reset-btn")
  document.body.appendChild(resetBtn)
  resetBtn.textContent = "Reset Game"

  resetBtn.addEventListener("click", function () {
    table.remove()
    game = new Game(WHITE_PLAYER)
    createChessBoard(game.boardData)
  })

  game = new Game(WHITE_PLAYER)
  createChessBoard(game.boardData)
}

window.addEventListener("load", initGame)
