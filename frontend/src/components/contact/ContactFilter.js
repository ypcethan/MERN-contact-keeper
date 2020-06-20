import React, { useRef, useEffect } from 'react';
import { filterContacts, clearFilter } from '../../redux/contact/contactAction'
import { useDispatch, useSelector } from 'react-redux'
const ContactFilter = () => {
    const text = useRef('');
    const dispatch = useDispatch()
    const filtered = useSelector(state => state.contact.filtered)
    useEffect(() => {
        if (filtered === null) {
            text.current.value = '';
        }
    });

    const onChange = (e) => {
        if (text.current.value !== "") {
            dispatch(filterContacts(e.target.value))
        } else {
            dispatch(clearFilter())
        }
    }

    return (
        <form>
            <input
                ref={text}
                type='text'
                placeholder='Filter Contacts...'
                onChange={onChange}
            />
        </form>
    );
};

export default ContactFilter;
