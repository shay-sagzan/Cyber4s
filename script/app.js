const WHITE_PLAYER = "white"
const BLACK_PLAYER = "black"

const newBoardData = new BoardData()
const newInitGame = new InitGame()

/// Nothing Yet ///
// class MoveSet {
//   constructor(row, col) {
//     this.row = row
//     this.col = col
//   }

//   //check if the click contains chars
//   isChar() {
//     if (boardData[this.row][this.col] !== undefined) {
//       return boardData[this.row][this.col]
//     } else return undefined
//   }

//   isClear(row, col) {
//     const char = this.isChar()
//     if (
//       row >= 0 &&
//       col >= 0 &&
//       row < 8 &&
//       col < 8 &&
//       boardData[row][col] !== undefined
//     ) {
//       return false
//     }
//     return true
//   }
// }
/// Nothing Yet ///

/// add this section to initGame ///
// function getInitialPieces() {
//   let result = []
//   addFirstRowPieces(result, 0, WHITE_PLAYER)
//   addFirstRowPieces(result, 7, BLACK_PLAYER)

//   for (let i = 0; i < BOARD_SIZE; i++) {
//     result.push(new Piece(1, i, PAWN, WHITE_PLAYER))
//     result.push(new Piece(6, i, PAWN, BLACK_PLAYER))
//   }
//   return result
// }

// function addFirstRowPieces(result, row, player) {
//   result.push(new Piece(row, 0, ROOK, player))
//   result.push(new Piece(row, 1, KNIGHT, player))
//   result.push(new Piece(row, 2, BISHOP, player))
//   result.push(new Piece(row, 3, KING, player))
//   result.push(new Piece(row, 4, QUEEN, player))
//   result.push(new Piece(row, 5, BISHOP, player))
//   result.push(new Piece(row, 6, KNIGHT, player))
//   result.push(new Piece(row, 7, ROOK, player))
// }

// function addImage(cell, player, name) {
//   const image = document.createElement("img")
//   image.src = "images/" + player + "/" + name + ".png"
//   cell.appendChild(image)
//   image.setAttribute("id", "chess-piece")
// }
/// add this section to initGame ///

/// add this section to piece.js ///
// function onCellClick(event, row, col) {
//   console.log("row", row)
//   console.log("col", col)
//   // Clear all previous possible moves
//   for (let i = 0; i < BOARD_SIZE; i++) {
//     for (let j = 0; j < BOARD_SIZE; j++) {
//       table.rows[i].cells[j].classList.remove("possible-move")
//     }
//   }
//   const piece = boardData.getPiece(row, col)
//   if (piece !== undefined) {
//     let possibleMoves = piece.getPossibleMoves()
//     for (let possibleMove of possibleMoves) {
//       const cell = table.rows[possibleMove[0]].cells[possibleMove[1]]
//       cell.classList.add("possible-move")
//     }
//   }

//   // Clear previously selected cell
//   if (selectedCell !== undefined) {
//     selectedCell.classList.remove("selected")
//   }

//   // Show selected cell
//   selectedCell = event.currentTarget
//   selectedCell.classList.add("selected")
// }
/// add this section to piece.js ///

/// add this section to initGame ///
// function createChessBoard() {
//   // Create empty chess board HTML:
//   table = document.createElement("table")
//   document.body.appendChild(table)

//   for (let row = 0; row < BOARD_SIZE; row++) {
//     const rowElement = table.insertRow()
//     for (let col = 0; col < BOARD_SIZE; col++) {
//       const cell = rowElement.insertCell()
//       if ((row + col) % 2 === 0) {
//         cell.className = "light-cell chess-cell"
//       } else {
//         cell.className = "dark-cell chess-cell"
//       }
//       cell.addEventListener("click", (event) => onCellClick(event, row, col))
//     }
//   }

//   // Create list of pieces (32 total)
//   boardData = new BoardData(getInitialPieces())

//   // Add pieces images to board
//   for (let piece of boardData.pieces) {
//     const cell = table.rows[piece.row].cells[piece.col]
//     addImage(cell, piece.player, piece.type)
//   }

//   const h1 = document.createElement("h1")
//   h1.innerText = "Chess-Board Game!"
//   document.body.appendChild(h1)
//   h1.classList.add("header")

//   const btnReset = document.createElement("button")
//   btnReset.innerText = "Reset"
//   document.body.appendChild(btnReset)
//   btnReset.classList.add("btnReset")
//   btnReset.addEventListener("click", (event) => getInitialPieces)

//   const btnSwitchPlayer = document.createElement("button")
//   btnSwitchPlayer.innerText = "Switch Players"
//   document.body.appendChild(btnSwitchPlayer)
//   btnSwitchPlayer.classList.add("btnSwitchPlayer")

// let chosenOne
// function active(row, col) {
//   const char = boardData[row][col]
//   const charMoves = new MoveSet(row, col)
//   //actually moves the char
//   if (
//     char === undefined &&
//     boardData.rows[row].cells[col].classList.contains("path")
//   ) {
//     boardData.rows[row].cells[col].innerHTML =
//       boardData.rows[chosenOne.row].cells[chosenOne.col].innerHTML
//     boardData[row][col] = new Char(chosenOne.type, chosenOne.name, row, col)
//     boardData.rows[chosenOne.row].cells[chosenOne.col].innerHTML = ""
//     BoardData[chosenOne.row][chosenOne.col] = undefined
//     chosenOne = undefined
//   }
// }
/// add this section to initGame ///

// window.addEventListener("load", createChessBoard)
