
import React, { Component } from 'react'

import './MovePreview.scss'

export function MovePreview({ move }) {
    return (
        <li className="move-preview flex column align-center" >
            <p><span className="bold">At:</span> {new Date(move.at).toLocaleString()}</p>
            <section className="transfer-details flex align-center">
                <p><span className="bold">To:</span> {move.to}</p>
                <p><span className="bold">Amount:</span> {move.amount}</p>
            </section>
        </li>
    )
}
