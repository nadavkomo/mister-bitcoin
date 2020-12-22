
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getById } from '../../store/actions/contactActions'
import { addMove, setUser } from '../../store/actions/userActions'
import { TransferFund } from '../../cmps/TransferFund/TransferFund'
import { MoveList } from '../../cmps/MoveList/MoveList'
import { eventBus } from '../../services/eventBusService'
import contactService from '../../services/contactService'
import userService from '../../services/userService'
import { storageService } from '../../services/storageService'
import './ContactDetailsApp.scss'
import back from '../../assets/icons/back.png'
import edit from '../../assets/icons/edit.png'


class _ContactDetails extends Component {
    state = {
        contact: null,
        errMsg: ''
    }
    async componentDidMount() {
        console.log(this.props.currUser);
        this.loadContact()
        if(storageService.load('CURR_USER')) {
            await this.props.setUser(storageService.load('CURR_USER'))
        }
        // eventBus.emit('details mounted')

    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.loadContact()
        }
    }
    async loadContact() {
        this.props.getById(this.props.match.params.id)
        // const contact = await contactService.getById(this.props.match.params.id)
        // this.setState({ contact })
    }
    onAddMove = async (amount) => {
        const { contact } = this.props
        const { currUser } = this.props
        console.log(contact);
        console.log(currUser);
        console.log(amount);
        if (!currUser) {
            this.setState({ errMsg: 'Login first!' })
            setTimeout(() => {
                this.setState({ errMsg: '' })
                this.props.history.push('/signup')
            }, 3000)
            return
        }
        if (currUser.coins < amount) {
            this.setState({ errMsg: 'You do not have enough coins' })
            setTimeout(() => {
                this.setState({ errMsg: '' })
            }, 3000)
            return
        }
        if (amount <= 0) {
            this.setState({ errMsg: 'invalid transfer amount' })
            setTimeout(() => {
                this.setState({ errMsg: '' })
            }, 3000)
            return
        }
        const updatedUser = await this.props.addMove(contact, amount, currUser)
        console.log(updatedUser);
    }
    currMoves = () => {
        const { contact } = this.props
        const currUser = storageService.load('CURR_USER')
        var currMoves = []
        console.log(contact);
        console.log(currUser);
        if (!currUser || currUser.moves.length === 0) return []
        currUser.moves.forEach(move => {
            console.log(move.to);
            console.log(contact.name);
            if (move.to === contact.name) {
                currMoves.push(move)
            }
        })
        console.log(currMoves);
        return currMoves
    }
    render() {
        const { contact } = this.props
        const {errMsg} = this.state
        if (!contact) return <div>Loading...</div>
        return <div className="contact-details flex column align-center">
            <section className="btns flex justify-center">
                <button className="btn" onClick={(ev) => {
                    ev.stopPropagation()
                    console.log('check');
                    this.props.history.goBack()
                }}><img src={back} alt="" /></button>
                <button className="btn" onClick={() => this.props.history.push('/contact/edit/' + contact._id)}><img src={edit} /></button>
            </section>
            <img className="contact-img" src={"https://robohash.org/" + contact._id} alt="" />
            <p>{contact.name}</p>
            <p>{contact.email}</p>
            <p>{contact.phone}</p>
            <TransferFund onAddMove={this.onAddMove} contact={contact} />
            <p>{errMsg}</p>
            <h3>Your moves:</h3>
            {this.currMoves().length > 0 && <MoveList moves={this.currMoves()} />}
        </div>
    }
}

function mapStateToProps(state) {
    return {
        contact: state.contactReducer.currContact,
        currUser: state.userReducer.currUser

    }
}
const mapDispatchToProps = {
    getById,
    addMove,
    setUser
}
export const ContactDetails = connect(mapStateToProps, mapDispatchToProps)(_ContactDetails)

