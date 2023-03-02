import { loginStart, loginSuccess, loginFailure, registerStart, registerFailure, registerSuccess, logoutSuccess, logoutStart, logoutFailure, setErrorMsg } from "./userSlice";
import { publicRequest } from "../requestMethods";



export const login = async (dispatch, user) => {
    dispatch(loginStart())
    try {
        const response = await publicRequest.post('api/v1/auth/login', user)

        dispatch(loginSuccess(response))
    } catch (err) {
        dispatch(loginFailure())
        if(err.message === 'Network Error'){
        dispatch(setErrorMsg('Network Error, try again '))

        }
        dispatch(setErrorMsg(err.response.data.msg))
    
    }
}



