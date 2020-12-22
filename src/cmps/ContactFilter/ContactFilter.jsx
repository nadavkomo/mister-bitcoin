
import React, { Component } from 'react'
import './ContactFilter.scss'

export class ContactFilter extends Component {
    state = {
        term: '',
    }
    onChangeHandler = (ev) => {
        const field = ev.target.name
        const value = ev.target.type === "number" ? +ev.target.value : ev.target.value
        this.setState({ [field]: value }, () => {
            this.props.onSetFilter({ ...this.state })
        })
    }
    render() {
        const { term } = this.state
        return <form className="contact-filter">
            <input name="term" placeholder="Free Search" value={ term } type="text" onChange={ this.onChangeHandler } />
        </form>

    }
}

