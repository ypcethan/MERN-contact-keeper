import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import contactReducer from './contact/contactReducer'
import authReducer from './auth/authReducer'
const rootReducer = combineReducers({
    'contact': contactReducer,
    'auth': authReducer
})

const store = createStore(rootReducer, composeWithDevTools())

export default store