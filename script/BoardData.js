class BoardData {
  constructor() {
    this.initPieces()
  }

  initPieces() {
    // Create list of pieces (32 total)
    this.pieces = []

    for (let i = 0; i < BOARD_SIZE; i++) {
      this.pieces.push(new Piece(0, i, PIECES[i], WHITE_PLAYER))
      this.pieces.push(new Piece(1, i, PAWN, WHITE_PLAYER))
      this.pieces.push(new Piece(6, i, PAWN, BLACK_PLAYER))
      this.pieces.push(new Piece(7, i, PIECES[i], BLACK_PLAYER))
    }
  }

  newBoard() {
    // Create list of pieces (32 total)
    this.pieces = []

    for (let i = 0; i < BOARD_SIZE; i++) {
      this.pieces.push(new Piece(0, i, PIECES[i], WHITE_PLAYER))
      this.pieces.push(new Piece(1, i, PAWN, WHITE_PLAYER))
      this.pieces.push(new Piece(6, i, PAWN, BLACK_PLAYER))
      this.pieces.push(new Piece(7, i, PIECES[i], BLACK_PLAYER))
    }
    return this.pieces
  }

  // Returns piece in row, col, or undefined if not exists.
  getPiece(row, col) {
    for (const piece of this.pieces) {
      if (piece.row === row && piece.col === col) {
        return piece
      }
    }
  }

  addEatenPieceToSide() {}

  removePiece(row, col) {
    let typeEaten
    let playerEaten
    let oldPiece = this.isPlayer(row, col, BLACK_PLAYER)
    for (let i = 0; i < this.pieces.length; i++) {
      const piece = this.pieces[i]
      if (piece.row === row && piece.col === col) {
        if (oldPiece === true) {
          typeEaten = this.getPiece(piece.row, piece.col).type
          playerEaten = this.isPlayer(piece.row, piece.col, BLACK_PLAYER)
          // console.log(playerEaten)
          this.addEatenPieceToSide(typeEaten, playerEaten)
        }
        if (oldPiece === false) {
          typeEaten = this.getPiece(piece.row, piece.col).type
          playerEaten = this.isPlayer(piece.row, piece.col, BLACK_PLAYER)
          // console.log(playerEaten)
          this.addEatenPieceToSide(typeEaten, playerEaten)
        }
        // Remove piece at index i
        this.pieces.splice(i, 1)
        return piece
      }
    }
  }

  isEmpty(row, col) {
    return this.getPiece(row, col) === undefined
  }

  isPlayer(row, col, player) {
    const piece = this.getPiece(row, col)
    return piece !== undefined && piece.player === player
  }
}
