
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setUser } from '../../store/actions/userActions';
import { UserPreview } from '../../cmps/UserPreview/UserPreview'
import {storageService} from '../../services/storageService'
import './HomePage.scss'
import hero from '../../assets/imgs/hero.jpg'

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
    render() {
        const {currUser} = this.props
        if(!currUser) return <div>Loading...</div>
        return (
            <section className="home-page flex column align-center full">
                <div className="img-container">
                    <img src={hero} />
                    {/* <img src="https://www.interiorfcu.org/wp-content/uploads/2017/11/Bitcoin.jpg" /> */}
                </div>
                <UserPreview user={currUser} />
            </section>
        )

    }
}

function mapStateToProps(state) {
    return {
        currUser: state.userReducer.currUser
    }
}

const mapDispatchToProps = {
    setUser
}


export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_HomePage)


