
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { ContactFilter } from '../../cmps/ContactFilter/ContactFilter';
import { ContactList } from '../../cmps/ContactList/ContactList';
import contactService from '../../services/contactService';
import { loadContacts } from '../../store/actions/contactActions';

import './ContactApp.scss'
import plus from '../../assets/icons/plus.png'

export function ContactApp(props) {
    const [filterBy, setFilterBy] = useState(null)

    const contacts = useSelector(state => state.contactReducer.contacts)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log('effect');
        dispatch(loadContacts(filterBy))
    }, [filterBy])

    const onSetFilter = (filterBy) => {
        setFilterBy(filterBy)
    }

    const onSelectContact = (selectedContactId) => {
        props.history.push(`/contact/${selectedContactId}`)
    }
    return (
        <div className="contact-app flex column align-center">
            <Link className="add-btn btn" to="/contact/edit"><img src={plus} /></Link>
            <section className="filter flex column auto-center">
                <h1>Contacts</h1>
                <ContactFilter onSetFilter={onSetFilter} />
            </section>
            {contacts && <ContactList onSelectContact={onSelectContact} contacts={contacts} />}
            {/* <button className="add-btn btn" onClick={() => this.props.history.push(`/contact/edit`)}><img src={plus} /></button> */}

        </div>
    )
}

// function mapStateToProps(state) {
//     return {
//         contacts: state.contactReducer.contacts
//         // If we want to filter the contacts first "like computed" but not really
//         // contacts: getContactsForDisplay(state.contactReducer.contacts)
//     }
// }
// const mapDispatchToProps = {
//     loadContacts
// }
// export const ContactApp = connect(mapStateToProps, mapDispatchToProps)(_ContactApp)
