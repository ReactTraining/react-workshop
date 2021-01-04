import React from 'react'
import { Card } from './Card'
import { Heading } from './Heading'
import './CardList.scss'

type Props = {
  cardListId: number
  name: string
}

export const CardList: React.FC<Props> = ({ cardListId, name }) => {
  return (
    <div className="card-list">
      <Heading size={3}>{name}</Heading>
      <Heading></Heading>
      <div className="card-list-scroll-area spacing">
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </div>
    </div>
  )
}
