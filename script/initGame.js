class InitGame {
  constructor() {
    this.blackPieces = []
    this.whitePieces = []
    this.turnColor = WHITE
    this.check = false
    this.#init()
    this.createChessBoard()
    this.render()
  }

  turn() {
    this.turnColor = this.turnColor === WHITE ? BLACK : WHITE
  }

  isCheck() {
    //checks for check on the white king
    for (const piece of this.blackPieces) {
      for (const move of piece.calcMoves()) {
        if (move.chess) {
          return WHITE
        }
      }
    }
    //checks for check on the black king
    for (const piece of this.whitePieces) {
      for (const move of piece.calcMoves()) {
        if (move.chess) {
          return BLACK
        }
      }
    }
    return false
  }

  #init() {
    this.blackPieces.push(
      new Rook(7, 7, BLACK, "../content/imgs/rook-black.png")
    )
    this.blackPieces.push(
      new Knight(7, 6, BLACK, "../content/imgs/horse-black.png")
    )
    this.blackPieces.push(
      new Bishop(7, 5, BLACK, "../content/imgs/bishop-black.png")
    )
    this.blackPieces.push(
      new Queen(7, 4, BLACK, "../content/imgs/queen-black.png")
    )
    this.blackPieces.push(
      new King(7, 3, BLACK, "../content/imgs/king-black.png")
    )
    this.blackPieces.push(
      new Bishop(7, 2, BLACK, "../content/imgs/bishop-black.png")
    )
    this.blackPieces.push(
      new Knight(7, 1, BLACK, "../content/imgs/horse-black.png")
    )
    this.blackPieces.push(
      new Rook(7, 0, BLACK, "../content/imgs/rook-black.png")
    )

    for (let i = 0; i < 8; i++) {
      this.blackPieces.push(
        new Pawn(6, i, BLACK, "../content/imgs/pawn-black.png")
      )
    }

    this.whitePieces.push(
      new Rook(0, 7, WHITE, "../content/imgs/rook-white.png")
    )
    this.whitePieces.push(
      new Knight(0, 6, WHITE, "../content/imgs/horse-white.png")
    )
    this.whitePieces.push(
      new Bishop(0, 5, WHITE, "../content/imgs/bishop-white.png")
    )
    this.whitePieces.push(
      new Queen(0, 4, WHITE, "../content/imgs/queen-white.png")
    )
    this.whitePieces.push(
      new King(0, 3, WHITE, "../content/imgs/king-white.png")
    )
    this.whitePieces.push(
      new Bishop(0, 2, WHITE, "../content/imgs/bishop-white.png")
    )
    this.whitePieces.push(
      new Knight(0, 1, WHITE, "../content/imgs/horse-white.png")
    )
    this.whitePieces.push(
      new Rook(0, 0, WHITE, "../content/imgs/rook-white.png")
    )

    for (let i = 0; i < 8; i++) {
      this.whitePieces.push(
        new Pawn(1, i, WHITE, "../content/imgs/pawn-white.png")
      )
    }
    this.whiteKing = this.whitePieces.find((p) => p.type === "k")
    this.blackKing = this.blackPieces.find((p) => p.type === "k")
  }

  createChessBoard() {
    // Create empty chess board HTML:
    table = document.createElement("table")
    document.body.appendChild(table)

    for (let row = 0; row < BOARD_SIZE; row++) {
      const rowElement = table.insertRow()
      for (let col = 0; col < BOARD_SIZE; col++) {
        const cell = rowElement.insertCell()
        if ((row + col) % 2 === 0) {
          cell.className = "light-cell chess-cell"
        } else {
          cell.className = "dark-cell chess-cell"
        }
        cell.addEventListener("click", (event) => onCellClick(event, row, col))
      }
    }

    // Create list of pieces (32 total)
    boardData = new BoardData(getInitialPieces())

    // Add pieces images to board
    for (let piece of boardData.pieces) {
      const cell = table.rows[piece.row].cells[piece.col]
      addImage(cell, piece.player, piece.type)
    }

    const h1 = document.createElement("h1")
    h1.innerText = "Chess-Board Game!"
    document.body.appendChild(h1)
    h1.classList.add("header")

    const btnReset = document.createElement("button")
    btnReset.innerText = "Reset"
    document.body.appendChild(btnReset)
    btnReset.classList.add("btnReset")
    btnReset.addEventListener("click", (event) => getInitialPieces)

    const btnSwitchPlayer = document.createElement("button")
    btnSwitchPlayer.innerText = "Switch Players"
    document.body.appendChild(btnSwitchPlayer)
    btnSwitchPlayer.classList.add("btnSwitchPlayer")
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
