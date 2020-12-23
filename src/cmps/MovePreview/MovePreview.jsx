
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import './MovePreview.scss'

function _MovePreview(props) {
    const { btnValue, move } = props
    function convertUsd() {
        if (!btnValue) return
        return (move.amount * (1 / btnValue)).toFixed(2).toLocaleString()
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
