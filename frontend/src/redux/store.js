import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import contactReducer from './contact/contactReducer'
import authReducer from './auth/authReducer'
const rootReducer = combineReducers({
    'contact': contactReducer,
    'auth': authReducer
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store