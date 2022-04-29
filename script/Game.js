class Game {
  constructor(firstPlayer) {
    this.boardData = new BoardData()
    this.currentPlayer = firstPlayer
    this.winner = undefined
  }

  /*
    // Tries to actually make a move. Returns true if successful.
        // possibleMoves looks like this: [[1,2], [3,2]]
      // possibleMove looks like this: [1,2]
        // There is a legal move
  */
  tryMove(piece, row, col) {
    const possibleMoves = this.myFunc(piece)
    for (const possibleMove of possibleMoves) {
      if (possibleMove[0] === row && possibleMove[1] === col) {
        const removedPiece = this.boardData.removePiece(row, col)
        let lastPieceRow = piece.row
        let lastPieceCol = piece.col
        piece.row = row
        piece.col = col

        if (checkIfCheck() === true) {
          piece.row = lastPieceRow
          piece.col = lastPieceCol
          this.boardData.removePiece(row, col)
          return
        }

        if (removedPiece !== undefined && removedPiece.type === KING) {
          this.winner = piece.player
        }
        this.currentPlayer = piece.getOpponent()
        return true
      }
    }
    return false
  }

  myFunc(piece) {
    if (this.currentPlayer !== piece.player || this.winner !== undefined) {
      return []
    }
    return piece.getPossibleMoves(this.boardData)
  }

  endOfTheGame() {
    if (game.winner !== undefined) {
      const winnerPopup = document.createElement("div")
      const winner = game.winner.charAt(0).toUpperCase() + game.winner.slice(1)
      winnerPopup.classList.add("Victory-jumps")
      winnerPopup.textContent = winner + " player wins!"
      console.log(winnerPopup.textContent)
      table.appendChild(winnerPopup)
      // document.querySelector(".Player-1").classList.toggle("player--active");
      // document.querySelector(".Player-2").classList.toggle("player--active");
      return true
    }
    return false
  }
}
