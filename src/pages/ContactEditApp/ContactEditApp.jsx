
import React, { Component } from 'react'
import { connect } from 'react-redux';
import contactService from '../../services/contactService'
import { addContact, updateContact, removeContact } from '../../store/actions/contactActions';
import './ContactEditApp.scss'
import back from '../../assets/icons/back.png'
import remove from '../../assets/icons/delete.png'
import save from '../../assets/icons/save.png'

class _ContactEdit extends Component {
    elInput = React.createRef();
    state = {
        contact: {
            name: '',
            email: '',
            phone: ''
        },
        errMsg: ''
    }
    async componentDidMount() {
        const { id } = this.props.match.params
        const contact = id ? await contactService.getById(id) : await contactService.getEmptyContact()
        if (contact) this.setState({ contact })
        else this.setState({ errMsg: 'Contact Not Found!' })
        this.elInput.current.focus()
    }
    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState(prevState => ({ contact: { ...prevState.contact, [field]: value } }))
    }
    onSaveContact = async (ev) => {
        ev.preventDefault()
        const {contact} = this.state
        if (contact.name === '' || contact.email === '' || contact.phone === '') {
            this.setState({ errMsg: 'Please fill all the above filled' })
            setTimeout(() => {
                this.setState({ errMsg: '' })
            }, 2500)
            return
        }
        if (contact._id) await this.props.updateContact(contact)
        else await this.props.addContact(contact)
        this.props.history.push('/contact')
        // this.props.history.goBack()
    }
    onRemoveContact = async () => {
        await this.props.removeContact(this.state.contact._id)
        this.props.history.push('/contact')
    }
    render() {
        const { name, email, phone } = this.state.contact

        return (
            <section className="contact-edit flex column align-center ">
                <section className="btns flex space-between">
                    <button className="btn back-btn" onClick={() => this.props.history.goBack()}><img src={back} alt=""  /></button>
                    {this.state.contact._id && <button className="btn" onClick={this.onRemoveContact}><img src={remove} alt=""  /></button>}
                </section>
                <form className="flex column auto-center" onSubmit={this.onSaveContact}>
                    <label>Name</label>
                    <input autoFocus type="text" ref={this.elInput} name="name" value={name} onChange={this.handleChange} />
                    <label>Email</label>
                    <input type="text" name="email" value={email} onChange={this.handleChange} />
                    <label>phone</label>
                    <input type="text" name="phone" value={phone} onChange={this.handleChange} />
                    <button className="btn save-btn"><img src={save} alt=""  /></button>
                    <span className="err-msg">{this.state.errMsg}</span>
                </form>
            </section>
        )
    }
}

const mapDispatchToProps = {
    addContact,
    updateContact,
    removeContact
}
export const ContactEdit = connect(null, mapDispatchToProps)(_ContactEdit)
