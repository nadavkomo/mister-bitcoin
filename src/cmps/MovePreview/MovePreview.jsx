
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import './MovePreview.scss'

function _MovePreview(props) {
    const {move} = props
    function convertUsd() {
        console.log((move.amount * 23547.53).toLocaleString());
        return (move.amount * 23547.53).toFixed(2).toLocaleString()
    }
    return (
        <li className="move-preview flex column align-center hover-pointer" onClick={() => props.history.push(`/contact/${move.toId}`)} >
            <p><span className="bold">At:</span> {new Date(move.at).toLocaleString()}</p>
                <p><span className="bold">To:</span> {move.to}</p>
                <p><span className="bold">Amount: ₿</span>{move.amount} |  ${convertUsd()}</p>
        </li>
    )
}

export const MovePreview = withRouter(_MovePreview)
