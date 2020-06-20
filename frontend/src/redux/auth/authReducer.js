import { LOGIN_FAIL } from "./authType"
const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: false,
    error: null
}

const authReducer = (state = initialState, action) => {

    switch (action.type) {

        default:
            return state
    }
}

export default authReducer