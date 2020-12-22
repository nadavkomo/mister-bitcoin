
import React, { Component } from 'react'
import { MoveList } from '../../cmps/MoveList/MoveList'
import userService from '../../services/userService.js'
import bitcoinService from '../../services/bitcoinService.js'
import coins from '../../assets/icons/coins.png'
import bitcoin from '../../assets/icons/bitcoin.png'
import './UserPreview.scss'

export class UserPreview extends Component {
    state = {
        user: '',
        btnValue: ''
    }
    componentDidMount() {
        this.loadUser()
    }
    async loadUser() {
        const user = this.props.user
        this.setState({ user }, () => {
            this.getBtnValue(this.state.user.coins)
        })
    }
    getBtnValue = async (coins) => {
        const value = await bitcoinService.getRate(coins)
        this.setState({ btnValue: value })
    }
    lastMoves = () => {
        if (this.props.user.moves.length > 3) {
            return this.props.user.moves.slice(-3)
        }
        return this.props.user.moves
    }
    render() {
        const { btnValue } = this.state
        const { user } = this.props
        if (!user) return <h3>Loading...</h3>
        return (
            <section className="user-preview flex align-center column">
                <section className="user-details flex column">
                    <h1>{`Welcome ${user.name}`}</h1>
                    <h3><img src={coins} />{`Coins: ${user.coins}`}</h3>
                    <h3><img src={bitcoin} />{`BTC: ${btnValue}`}</h3>
                </section>
                <section className="transfer-details flex column align-center">
                    {user.moves.length > 0 && <h3>Your last moves</h3>}
                    {user.moves.length > 0 && <MoveList btnValue={btnValue} moves={this.lastMoves()} />}
                </section>
            </section>
        )
    }
}

