
import React, { Component } from 'react'
import { addMove } from '../../store/actions/userActions'

import './TransferFund.scss'

export class TransferFund extends Component {
    state = {
        amount: ''
    }
    handleChange = (ev) => {
        ev.preventDefault()
        this.setState({amount: +ev.target.value })
    }
    onAddMove = (ev) => {
        ev.preventDefault()
        this.props.onAddMove(this.state.amount)
        this.setState({amount: '' })
    }
    render() {
        const {contact} = this.props
        const {amount} = this.state
        return (
            <section className="transfer-fund flex column align-center">
                <h3 className="text-center">{`Transfer BTC coins to ${contact.name}`}</h3>
                <form className="amount flex justify-center" onSubmit={this.onAddMove} >
                    <input type="number" step="any" name="amount" value={amount} onChange={this.handleChange} />
                    <button>Transfer</button>
                </form>
            </section>
        )
    }
}
