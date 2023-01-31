import { loginStart, loginSuccess, loginFailure, registerStart, registerFailure, registerSuccess } from "./userSlice";
import { publicRequest } from "../requestMethods";



export const login = async (dispatch, user) => {
    dispatch(loginStart())
    try {
        const response = await publicRequest.post('api/v1/auth/login', user)

        dispatch(loginSuccess(response))
    } catch (err) {
        dispatch(loginFailure())
    }
}

export const register = async (dispatch, user) => {
    dispatch(registerStart)

    try {
        const response = await publicRequest.post('api/v1/auth/register', user)
        dispatch(registerSuccess(user))
    } catch (err) {
        dispatch(registerFailure(err))
    }
}

