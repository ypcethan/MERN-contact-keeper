import { ADD_CONTACT, DELETE_CONTACT, UPDATE_CONTACT, SET_CURRENT, CLEAR_CURRENT, FILTER_CONTACTS, CLEAR_FILTER } from "./contactType"


export const addContact = (contact) => {
    return {
        type: ADD_CONTACT,
        payload: contact
    }
}

export const deleteContact = (id) => {
    return {
        type: DELETE_CONTACT,
        payload: id
    }
}

export const updateContact = (contact) => {
    return {
        type: UPDATE_CONTACT,
        payload: contact
    }
}

export const setCurrent = (contact) => {
    return {
        type: SET_CURRENT,
        payload: contact
    }
}

export const clearCurrent = () => {
    return {
        type: CLEAR_CURRENT
    }
}

export const filterContacts = (text) => {
    return {
        type: FILTER_CONTACTS,
        payload: text
    }
}

export const clearFilter = () => {
    return {
        type: CLEAR_FILTER
    }
}