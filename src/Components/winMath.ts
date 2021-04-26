import { FIELDS_FOR_WIN, NO_PLAYER_ID, PLAYER_1_ID, PLAYER_2_ID } from './Constants'

/**
 * taken from: https://stackoverflow.com/a/17428705
 * transposes a matrix - transforms columns into rows
 * example
 * input:
 * [[1,2,3],
 * [4,5,6],
 * [7,8,9]]
 * returns:
 * [[1,4,7],
 * [2,5,8],
 * [3,6,9]]
 */
const transposeMatrix = (rows: string[][]) =>
  rows[0].map((_, colIndex) => rows.map(row => row[colIndex]))

/**
 * reverses the columns of a matrix
 * example
 * input:
 * [[1,2,3],
 * [4,5,6],
 * [7,8,9]]
 * returns:
 * [[3,2,1],
 * [6,5,4],
 * [9,8,7]]
 */
const reverseColsMatrix = (rows: string[][]) => rows.map(row => [...row].reverse())

/** checks if the array includes an ID of a player and if that is the case it returns it. Otherwise returns NO_PLAYER_ID. */
const checkForWin = (mayWin: string[]) => {
  if (mayWin.includes(PLAYER_1_ID)) {
    return PLAYER_1_ID
  } else if (mayWin.includes(PLAYER_2_ID)) {
    return PLAYER_2_ID
  } else {
    return NO_PLAYER_ID
  }
}

/**
 * checks for four or more consecutive symbols in a row and if that is the case a winner is determined
 * if no winner has been determined NO_PLAYER_ID is returned
 */
const checkRow = (row: string[]) => {
  let counter = 0
  let lastPlayer = NO_PLAYER_ID
  for (const field of row) {
    /** makes sure a winner with NO_PLAYER_ID cannot be returned during the for cycle */
    if (lastPlayer !== NO_PLAYER_ID) {
      /** compares the current position with the last position - the winning symbols have to be consecutive */
      if (field === lastPlayer) {
        counter++
        /**
         * if a certain number (FIELDS_FOR_WIN) of same consecutive symbols appear it means a player has won
         * that players ID is then returned
         */
        if (counter >= FIELDS_FOR_WIN) {
          return lastPlayer
        }
      } else {
        counter = 1
        lastPlayer = field
      }
    } else {
      counter = 1
      lastPlayer = field
    }
  }
  return NO_PLAYER_ID
}

/**
 * transposes a matrix into diagonal shape across the principal diagonal
 * example
 * input:
 * [[1,2,3],
 * [4,5,6],
 * [7,8,9]]
 * returns:
 * [[3],
 * [2,6],
 * [1,5,9],
 * [4,8],
 * [7]]
 */
const getDiagonalMatrix = (board: string[][]) => {
  let newMatrix = [[]] as string[][]
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (!newMatrix[i + j]) {
        newMatrix.push([])
      }
      newMatrix[i + j].push(board[i][j])
    }
  }
  return newMatrix
}

const checkRows = (rows: string[][]) => checkForWin(rows.map(col => checkRow(col)))

const checkCols = (rows: string[][]) => checkForWin(transposeMatrix(rows).map(col => checkRow(col)))

const checkPrincipalDiagonal = (rows: string[][]) =>
  checkForWin(getDiagonalMatrix(rows).map(col => checkRow(col)))

const checkSecondaryDiagonal = (rows: string[][]) => {
  const secondaryDiagonal = getDiagonalMatrix(reverseColsMatrix(rows))
  return checkForWin(secondaryDiagonal.map(col => checkRow(col)))
}

/**  Used to determine whether a player has won and which player is the winner */
export const checkWin = (rows: string[][]) => {
  let winner = NO_PLAYER_ID
  winner = checkRows(rows)
  if (winner === NO_PLAYER_ID) winner = checkCols(rows)
  if (winner === NO_PLAYER_ID) winner = checkPrincipalDiagonal(rows)
  if (winner === NO_PLAYER_ID) winner = checkSecondaryDiagonal(rows)
  return winner
}
