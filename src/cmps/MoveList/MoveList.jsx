
import React, { Component } from 'react'
import {MovePreview} from '../../cmps/MovePreview/MovePreview'
import './MoveList.scss'

export function MoveList({ moves}) {
    if(moves.length === 0) return <div>Loading...</div>
    return (
      <ul className="move-list clean-list flex column auto-center ">
        {
          moves.map(move => <MovePreview move={move} key={move.to} />)
        }
      </ul>
    )
  }
