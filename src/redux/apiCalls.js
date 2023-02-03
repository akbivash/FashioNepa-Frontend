import { loginStart, loginSuccess, loginFailure, registerStart, registerFailure, registerSuccess, logoutSuccess, logoutStart, logoutFailure } from "./userSlice";
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
    dispatch(registerStart())

    try {
  const res =      await publicRequest.post('api/v1/auth/register', user)
 
        dispatch(registerSuccess(res))
    } catch (err) {
        dispatch(registerFailure(err))
    }
}

