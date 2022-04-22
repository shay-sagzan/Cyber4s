class Piece {
  constructor(row, col, type, player, img) {
    this.row = row
    this.col = col
    this.type = type
    this.player = player
    this.el = document.createElement("img")
    this.el.src = img
    this.alive = true
    this.oldRow = row
    this.oldCol = col
    this.possibleMoves = []
    this.oldPossibleMoves = [...this.possibleMoves]
  }

  onCellClick(event, row, col) {
    console.log("row", row)
    console.log("col", col)
    // Clear all previous possible moves
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        table.rows[i].cells[j].classList.remove("possible-move")
      }
    }
    const piece = boardData.getPiece(row, col)
    if (piece !== undefined) {
      let possibleMoves = piece.getPossibleMoves()
      for (let possibleMove of possibleMoves) {
        const cell = table.rows[possibleMove[0]].cells[possibleMove[1]]
        cell.classList.add("possible-move")
      }
    }

    // Clear previously selected cell
    if (selectedCell !== undefined) {
      selectedCell.classList.remove("selected")
    }

    // Show selected cell
    selectedCell = event.currentTarget
    selectedCell.classList.add("selected")
  }

  getPossibleMoves() {
    // Get relative moves
    let relativeMoves
    let result = []
    if (this.type === PAWN) {
      relativeMoves = this.getPawnRelativeMoves()
    } else if (this.type === ROOK) {
      relativeMoves = this.getRookRelativeMoves()
    } else if (this.type === KNIGHT) {
      relativeMoves = this.getKnightRelativeMoves()
    } else if (this.type === BISHOP) {
      relativeMoves = this.getBishopRelativeMoves()
    } else if (this.type === KING) {
      relativeMoves = this.getKingRelativeMoves()
    } else if (this.type === QUEEN) {
      relativeMoves = this.getQueenRelativeMoves()
    }
    console.log("Unknown type", type)
    console.log("relativeMoves", relativeMoves)

    // Get absolute moves
    let absoluteMoves = []
    for (let relativeMove of relativeMoves) {
      const absoluteRow = this.row + relativeMove[0]
      const absoluteCol = this.col + relativeMove[1]
      absoluteMoves.push([absoluteRow, absoluteCol])
    }

    // Get filtered absolute moves
    let filteredMoves = []
    for (let absoluteMove of absoluteMoves) {
      const absoluteRow = absoluteMove[0]
      const absoluteCol = absoluteMove[1]
      if (
        absoluteRow >= 0 &&
        absoluteRow <= 7 &&
        absoluteCol >= 0 &&
        absoluteCol <= 7
      ) {
        filteredMoves.push(absoluteMove)
      }
    }
    console.log("filteredMoves", filteredMoves)
    return filteredMoves
  }

  getPawnRelativeMoves() {
    let direction = 1
    if (this.player === BLACK_PLAYER) {
      direction = -1
    }
    return [[1 * direction, 0]]
  }

  getQueenRelativeMoves() {
    let result = []
    for (let i = 1; i < BOARD_SIZE; i++) {
      result.push([i, 0])
      result.push([-i, 0])
      result.push([0, i])
      result.push([0, -i])
      result.push([i, -i])
      result.push([i, i])
      result.push([-i, i])
      result.push([-i, -i])
    }
    return result
  }

  getBishopRelativeMoves() {
    let result = []
    for (let i = 1; i < BOARD_SIZE; i++) {
      result.push([i, -i])
      result.push([i, i])
      result.push([-i, i])
      result.push([-i, -i])
    }
    return result
  }

  getRookRelativeMoves() {
    let result = []
    for (let i = 1; i < BOARD_SIZE; i++) {
      result.push([i, 0])
      result.push([-i, 0])
      result.push([0, i])
      result.push([0, -i])
    }
    return result
  }

  getKingRelativeMoves() {
    let result = []
    for (let row = -1; row <= 1; row++) {
      for (let col = -1; col <= 1; col++) {
        if (!(row === 0 && col === 0)) {
          result.push([row, col])
        }
      }
    }
    return result
  }

  getKnightRelativeMoves() {
    let result = []
    for (let i = 1; i < BOARD_SIZE; i++) {
      result.push([-2, -1])
      result.push([-1, -2])
      result.push([1, -2])
      result.push([2, -1])
      result.push([2, 1])
      result.push([1, 2])
      result.push([-1, 2])
      result.push([-2, 1])
    }
    return result
  }

  dbl(x, y) {
    const sum = x * y
    return sum
  }

  activate() {
    this.el.classList.add("chess-piece--active")
    this.displayMoves()
    boardData.active = this
  }

  deactivate() {
    this.el.classList.remove("chess-piece--active")
    this.hideMoves()
    boardData.removeActive()
  }

  calcMoves() {
    return this.possibleMoves
  }
}

class Knight extends Piece {
  constructor(row, col, type, player, img) {
    super(row, col, type, KNIGHT, img)
    this.possibleMove = this.getKnightRelativeMoves
  }

  showPossibleMoves() {
    const possibleEats = []
    const possibleMoves = []

    for (let i = 0; i < this.getKnightRelativeMoves.length; i++) {
      let directionArr = this.getKnightRelativeMoves[i]
      let row = directionArr[0]
      for (let j = 1; j < 2; j++) {
        let columns = directionArr[j]
        for (let y = 0; y < 2; y++) {
          if (this.row + row < BOARD_SIZE && this.row + row > -1) {
            if (this.col + col[y] < BOARD_SIZE && this.col + col[y] > -1) {
              if (
                boardData[this.row + row][this.col + col[y]].getColor() ===
                this.enemyColor
              )
                possibleEats.push([this.row + row, this.col + col[y]])
              else if (
                boardData[this.row + row][this.col + col[y]].getName() ===
                "Empty"
              )
                possibleMoves.push([this.row + row, this.col + col[y]])
            }
          }
        }
      }
    }
  }
}

class Pawn extends Piece {
  constructor(row, col, type, player, img) {
    super(row, col, type, PAWN, img)
    this.possibleMove = this.getPawnRelativeMoves
  }

  showPossibleMoves() {
    this.possibleEats = []
    this.possibleMoves = []

    if (this.color === BLACK) {
      let offset = -1
      if (this.firstTurn) {
        this.checkForBlocks(this.row, this.col, offset, 2)
      } else {
        this.checkForBlocks(this.row, this.col, offset, 1)
      }
      this.canEat(this.row, this.col, offset)
    }

    if (this.color === WHITE) {
      if (this.firstTurn) {
        this.checkForBlocks(this.row, this.col, 1, 2)
      } else {
        this.checkForBlocks(this.row, this.col, 1, 1)
      }
      this.canEat(this.row, this.col, 1)
    }

    return this.possibleMoves
  }
}

class Queen extends Piece {
  constructor(row, col, type, player, img) {
    super(row, col, type, QUEEN, img)
  }
  calcMoves() {
    this.possibleMoves = []
    const tempBi = new Bishop(this.row, this.col, this.color, "")
    const tempR = new Rook(this.row, this.col, this.color, "")
    tempBi.calcMoves()
    tempR.calcMoves()
    this.possibleMoves = tempBi.possibleMoves.concat(tempR.possibleMoves)
    return this.possibleMoves
  }
}
