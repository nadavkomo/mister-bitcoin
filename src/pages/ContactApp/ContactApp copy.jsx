
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { ContactFilter } from '../../cmps/ContactFilter/ContactFilter';
import { ContactList } from '../../cmps/ContactList/ContactList';
import contactService from '../../services/contactService';
import { loadContacts } from '../../store/actions/contactActions';

import './ContactApp.scss'
import plus from '../../assets/icons/plus.png'

class _ContactApp extends Component {
    state = {
        contacts: null,
        filterBy: null,
        selectedContactId: null
    }
    componentDidMount() {
        this.props.loadContacts(this.state.filterBy)
    }
    // async loadContacts() {
    //     const contacts = await contactService.getContacts(this.state.filterBy)
    //     this.setState({ contacts })
    // }
    onSetFilter = (filterBy) => {
        console.log('Filter Happend!', filterBy);
        this.setState({ filterBy }, () => this.props.loadContacts(filterBy))
    }
    onSelectContact = (selectedContactId) => {
        this.props.history.push(`/contact/${selectedContactId}`)
    }
    render() {
        const { contacts } = this.props
        if (!contacts) return <h1>Loading...</h1>
        return (
            <div className="contact-app flex column align-center">
                <section className="flex column auto-center">
                    <h1>Contacts</h1>
                    <ContactFilter onSetFilter={this.onSetFilter} />
                </section>
                <ContactList onSelectContact={this.onSelectContact} contacts={contacts} />
                <button className="add-btn btn" onClick={() => this.props.history.push(`/contact/edit`)}><img src={plus} /></button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        contacts: state.contactReducer.contacts
        // If we want to filter the contacts first "like computed" but not really
        // contacts: getContactsForDisplay(state.contactReducer.contacts)
    }
}
const mapDispatchToProps = {
    loadContacts
}
export const ContactApp = connect(mapStateToProps, mapDispatchToProps)(_ContactApp)
