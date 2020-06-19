import { ADD_CONTACT } from "./contactType"


export const addContact = (contact) => {
    return {
        type: ADD_CONTACT,
        payload: contact
    }
}