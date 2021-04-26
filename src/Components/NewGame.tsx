import React from 'react'
import styled from 'styled-components'

type Props = {
  onClick: () => void
  value: string
}
const NewGameButton = styled.button`
  background: black;
  color: white;
  margin-bottom: 10px;
  font-size: 17px;
`

const NewGame = (props: Props) => {
  return <NewGameButton onClick={props.onClick}>{props.value}</NewGameButton>
}

export default NewGame
