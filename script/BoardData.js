class BoardData {
  constructor() {
    this.initPieces()
  }

  /**
   * @function initPieces
   * The function create list of pieces (32 total)
   */
  initPieces() {
    this.pieces = []

    for (let i = 0; i < BOARD_SIZE; i++) {
      this.pieces.push(new Piece(0, i, PIECES[i], WHITE_PLAYER))
      this.pieces.push(new Piece(1, i, PAWN, WHITE_PLAYER))
      this.pieces.push(new Piece(6, i, PAWN, BLACK_PLAYER))
      this.pieces.push(new Piece(7, i, PIECES[i], BLACK_PLAYER))
    }
  }

  /**
   * @function getPiece
   * The function check the which piece is in the given row and col
   * @param row - given row
   * @param col - given col
   * @returns
   * piece in given row and col, or undefined if not exists
   */
  getPiece(row, col) {
    for (const piece of this.pieces) {
      if (piece.row === row && piece.col === col) {
        return piece
      }
    }
  }

  /**
   * @function addSmallImages
   * The function creates the small images on the side divs
   * @param player - given player color
   * @param type - given type of the piece
   */
  addSmallImages(player, type) {
    const img = document.createElement("img")
    img.src = "images/" + player + "/" + type + ".png"
    img.draggable = false
    if (player === BLACK_PLAYER) {
      img.classList.add("black-eaten-img")
      eatenBlackPieces.appendChild(img)
    } else {
      img.classList.add("white-eaten-img")
      eatenWhitePieces.appendChild(img)
    }
  }

  /**
   * @function removedPiece
   * The function remove eaten piece from the board
   * @param row - given row
   * @param col - given col
   * @returns
   * The new element in the row and the col of the eaten element
   */
  removePiece(row, col) {
    for (let i = 0; i < this.pieces.length; i++) {
      const piece = this.pieces[i]
      if (piece.row === row && piece.col === col) {
        let oldPiecePlayer = piece.player
        let oldPieceType = piece.type
        this.addSmallImages(oldPiecePlayer, oldPieceType)

        // Remove piece at index i
        this.pieces.splice(i, 1)
        return piece
      }
    }
  }

  /**
   * @function isEmpty
   * The function check if the given piece (row, col) is empty (undefined)
   * @param row - given row
   * @param col - given col
   * @returns
   * True if the getPiece is === undefined. Otherwise - false
   */
  isEmpty(row, col) {
    return this.getPiece(row, col) === undefined
  }

  /**
   * @function isPlayer
   * The function check what is the color of the element on given piece
   * @param row - given row
   * @param col - given col
   * @param player - given player color
   * @returns
   * True if the given player equals to the player in the piece. Otherwise - false
   */
  isPlayer(row, col, player) {
    const piece = this.getPiece(row, col)
    return piece !== undefined && piece.player === player
  }
}
