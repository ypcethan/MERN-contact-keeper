import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { addContact } from '../../redux/contact/contactAction'
const ContactForm = () => {

    const dispatch = useDispatch()
    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });

    const { name, email, phone, type } = contact;

    const onChange = e =>
        setContact({ ...contact, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        dispatch(addContact({ name, email, phone, type }))
        setContact({
            name: '',
            email: '',
            phone: '',
            type: 'personal'
        })
    };
    return (
        <form onSubmit={onSubmit}>

            <input
                type='text'
                placeholder='Name'
                name='name'
                value={name}
                onChange={onChange}
            />
            <input
                type='email'
                placeholder='Email'
                name='email'
                value={email}
                onChange={onChange}
            />
            <input
                type='text'
                placeholder='Phone'
                name='phone'
                value={phone}
                onChange={onChange}
            />
            <h5>Contact Type</h5>
            <input
                type='radio'
                name='type'
                value='personal'
                checked={type === 'personal'}
                onChange={onChange}
            />
      Personal
            <input
                type='radio'
                name='type'
                value='professional'
                checked={type === 'professional'}
                onChange={onChange}
            />
      Professional
            <div>
                <input
                    type='submit'
                    value='Add Contact'
                    className='btn btn-primary btn-block'
                />
            </div>
        </form>
    );
};

export default ContactForm;