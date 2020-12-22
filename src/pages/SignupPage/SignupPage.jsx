
import React, { Component } from 'react'
import { connect } from 'react-redux';
import userService from '../../services/userService'
import { login, signup, setUser } from '../../store/actions/userActions';
import bitcoin from '../../assets/icons/bitcoin.png'
import './SignupPage.scss'
import { storageService } from '../../services/storageService';
class _SignupPage extends Component {
    state = {
        user: {
            name: '',
            coins: 100,
            moves: []
        },
        errMsg: ''
    }
    async componentDidMount() {
        await this.props.setUser('')
        storageService.remove('CURR_USER')
    }
    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState(prevState => ({ user: { ...prevState.user, [field]: value } }))
    }
    onLogin = async (ev) => {
        ev.preventDefault()
        const name = this.state.user.name
        if (name === '') {
            this.setState({ errMsg: 'username invalid' })
            setTimeout(() => {
                this.setState({ errMsg: '' })
                this.setState({
                    user: {
                        name: '',
                        coins: 100,
                        moves: []
                    },
                })
            }, 2500)
            return
        }
        const user = await this.props.login(name)
        if (!user) {
            this.setState({ errMsg: 'login failed' })
            setTimeout(() => {
                this.setState({ errMsg: '' })
                this.setState({
                    user: {
                        name: '',
                        coins: 100,
                        moves: []
                    },
                })
            }, 2500)
            return
        }
        // const user = this.props.login(name)
        this.props.history.push('/')
    }
    onConnect = async (ev, func) => {
        if (func === this.props.login) ev.preventDefault()
        const name = this.state.user.name
        if (name === '') {
            this.setState({ errMsg: 'username invalid' })
            setTimeout(() => {
                this.setState({ errMsg: '' })
            }, 2500)
            return
        }
        const res = await func(name)
        if (!res) {
            this.setState({ errMsg: 'login failed' })
            setTimeout(() => {
                this.setState({ errMsg: '' })
                this.setState({
                    user: {
                        name: '',
                        coins: 100,
                        moves: []
                    },
                })
            }, 2500)
            return
        } else if (res === 'username already exists') {
            this.setState({ errMsg: res })
            setTimeout(() => {
                this.setState({ errMsg: '' })
                this.setState({
                    user: {
                        name: '',
                        coins: 100,
                        moves: []
                    },
                })
            }, 2500)
            return
        }
        this.props.history.push('/')
    }
    render() {
        const { user, errMsg } = this.state
        return (
            <section className="signup-page flex column align-center">
                <div className="img-container">
                    <img src={bitcoin} alt="" />
                </div>
                <form className="flex column auto-center" onSubmit={(ev) => this.onConnect(ev, this.props.login)}>
                    <input type="text" name="name" value={user.name} onChange={this.handleChange} />
                    <button className="Login-btn">Login</button>
                </form>
                <p>{errMsg}</p>
                <button className="signup-btn" onClick={(ev) => this.onConnect(ev, this.props.signup)}>Signup</button>
            </section>
        )
    }
}

const mapDispatchToProps = {
    login,
    signup,
    setUser
}
export const SignupPage = connect(null, mapDispatchToProps)(_SignupPage)

