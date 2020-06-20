import { REGISTER_FAIL, REGISTER_SUCCESS } from './authType'
import axios from 'axios'

export const register = (formData) => {
    return async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/api/users', formData, config);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });

            // loadUser();
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response
            });
        }
    }
}