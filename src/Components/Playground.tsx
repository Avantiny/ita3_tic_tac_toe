import { PLAYER_1_ID, PLAYER_2_ID } from './Constants'
import { throws } from 'node:assert'
import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  width: 40px;
  height: 40px;
  background-color: white;
  font-size: 30px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  display: flex;
`
type Props = {
  playground: string[][]
  handleClick: (n1: number, n2: number) => void
}

const checkPlayer = (col: string) => (col === PLAYER_1_ID ? 'X' : col === PLAYER_2_ID ? 'O' : ' ')

const Playground = (props: Props) => {
  return (
    <table width='10rem' style={{ backgroundColor: 'black' }}>
      <tbody style={{ paddingBottom: '30px', boxShadow: '-1px 0px 30px 0px rgba(50, 48, 50, 1)' }}>
        {props.playground.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((col, colIndex) => (
              <td key={colIndex}>
                <Button
                  onClick={() => props.handleClick(rowIndex, colIndex)}
                  style={{
                    backgroundColor:
                      checkPlayer(col) === 'X'
                        ? 'red'
                        : checkPlayer(col) === 'O'
                        ? 'blue'
                        : 'white',
                  }}
                >
                  {checkPlayer(col)}
                </Button>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Playground
