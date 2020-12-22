
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setUser } from '../../store/actions/userActions';
import { UserPreview } from '../../cmps/UserPreview/UserPreview'
import {storageService} from '../../services/storageService'
import './HomePage.scss'

class _HomePage extends Component {
    async componentDidMount() {
        if(storageService.load('CURR_USER')) {
            await this.props.setUser(storageService.load('CURR_USER'))
        }
        const {currUser} = this.props
        if(!currUser) {
            this.props.history.push('/signup')
        }
    }
    // isLoggedin = () => {
    //     const user = storageService.load('CURR_USER')
    //     return user
    // }
    render() {
        const {currUser} = this.props
        // if(!this.isLoggedin()) return <button onClick={this.props.history.push('/signup')}>login first</button>
        if(!currUser) return <div>Loading...</div>
        return (
            <section className="home-page flex column align-center full">
                <div className="img-container">
                    <img src="https://www.interiorfcu.org/wp-content/uploads/2017/11/Bitcoin.jpg" />
                </div>
                <UserPreview user={currUser} />
            </section>
        )

    }
}

function mapStateToProps(state) {
    return {
        currUser: state.userReducer.currUser
        // If we want to filter the contacts first "like computed" but not really
        // contacts: getContactsForDisplay(state.contactReducer.contacts)
    }
}

const mapDispatchToProps = {
    setUser
}


export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_HomePage)


