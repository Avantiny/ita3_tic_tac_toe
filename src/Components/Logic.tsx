import { MAX_MOVES, NO_PLAYER_ID, PLAYER_1_ID, PLAYER_2_ID, PLAYGROUND_SIZE } from './Constants'
import { checkWin } from './winMath'
import { useEffect, useState } from 'react'
import NewGame from './NewGame'
import Playground from './Playground'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: -10px;
  padding-right: 17px;
  max-width: 100%;
  background: rgb(112, 107, 179);
  background: radial-gradient(circle, rgba(112, 107, 179, 1) 0%, rgba(109, 230, 255, 1) 100%);
  height: 100vh;
  max-height: 100%;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`

const defaultPlayground = Array.from({ length: PLAYGROUND_SIZE }, () =>
  Array.from({ length: PLAYGROUND_SIZE }, () => NO_PLAYER_ID)
)

const HookLogic = () => {
  const [totalTurns, setTotalTurns] = useState(0)
  const [playground, setPlayground] = useState(defaultPlayground)
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1_ID)

  useEffect(() => {
    if (totalTurns === MAX_MOVES) {
      callDraw()
    }
  }, [totalTurns])

  const newGame = () => {
    setTotalTurns(0)
    setPlayground(defaultPlayground)
    setCurrentPlayer(PLAYER_1_ID)
  }

  const callDraw = () => {
    alert(`It's a draw!`)
    newGame()
  }

  const handleClick = async (rowIndex: number, colIndex: number) => {
    let shouldStateUpdate = playground[rowIndex][colIndex] === NO_PLAYER_ID
    const newPlayground = playground.map((srow, srowIndex) =>
      srowIndex === rowIndex
        ? srow.map((scol, scolIndex) =>
            scolIndex === colIndex && scol === NO_PLAYER_ID ? currentPlayer : scol
          )
        : srow
    )

    if (shouldStateUpdate) {
      setPlayground(newPlayground)
      setCurrentPlayer(currentPlayer === PLAYER_1_ID ? PLAYER_2_ID : PLAYER_1_ID)
      setTotalTurns(totalTurns + 1)
    }
    const winningPlayer = checkWin(newPlayground)
    if (winningPlayer !== NO_PLAYER_ID) {
      alert(`Player ${winningPlayer} has won`)
      newGame()
    }
  }

  return (
    <Wrapper>
      <h1>Tic Tac Toe</h1>
      <div>
        Player turn: <strong>{currentPlayer}</strong>
      </div>
      <div>
        Total turns: <strong>{totalTurns}</strong>
      </div>
      <div style={{ paddingBottom: '10px' }}>You win by getting 4 consecutive symbols</div>
      <NewGame onClick={newGame} value='New Game' />
      <Playground handleClick={handleClick} playground={playground} />
    </Wrapper>
  )
}

export default HookLogic
