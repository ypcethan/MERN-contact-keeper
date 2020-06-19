import { ADD_CONTACT } from './contactType'


const initialState = {
    contacts: [
        {
            _id: 2,
            name: "Ethan",
            email: "adf@gmail.com",
            phone: "asdfa",
            type: 'personal'
        },
        {
            _id: 4,
            name: "Ethan",
            email: "adfdff@gmail.com",
            phone: "asdfa",
            type: 'personal'
        }
    ]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, action.payload]
            }
        default:
            return state
    }
}

export default reducer