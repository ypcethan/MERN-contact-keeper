import React from 'react'
import ContactItem from './ContactItem'
import { useSelector } from 'react-redux'
const Contacts = () => {

    const filtered = useSelector(state => state.contact.filtered)
    const contacts = useSelector(state => state.contact.contacts)
    return (
        <div>
            <h2>Contacts</h2>
            {
                filtered !== null ?
                    filtered.map(contact => (
                        <ContactItem contact={contact} key={contact._id} />
                    )) :
                    contacts.map(contact => (
                        <ContactItem contact={contact} key={contact._id} />
                    ))
            }
        </div>
    )
}


export default Contacts