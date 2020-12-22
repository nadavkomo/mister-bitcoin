import contactService from '../../services/contactService'

// Action Dispatcher
export function loadContacts(filterBy) {
    return async dispatch => {
        const contacts = await contactService.query(filterBy)
        dispatch({ type: 'SET_CONTACTS', contacts })
    }
}

export function getById(contactId) {
    return async dispatch => {
        const contact = await contactService.getById(contactId)
        dispatch({ type: 'SET_CONTACT', contact })
    }
}
export function removeContact(contactId) {
    return async dispatch => {
        try {
            await contactService.remove(contactId)
            dispatch({ type: 'REMOVE_CONTACT', contactId })
        } catch (err) {
            console.log('ERROR!');
        }
    }
}


export function addContact(contact) {
    return async dispatch => {
        try {
            const savedContact = await contactService.save(contact)
            console.log('savedContact', savedContact);
            dispatch({ type: 'ADD_CONTACT', contact: savedContact })
        } catch (err) {
            console.log('ERROR!');
        }
    }
}
export function updateContact(contact) {
    return async dispatch => {
        try {
            const savedContact = await contactService.save(contact)
            dispatch({ type: 'UPDATE_CONTACT', contact: savedContact })
        } catch (err) {
            console.log('ERROR!');
        }
    }
}