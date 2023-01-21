import { loginStart, loginSuccess, loginFailure } from "./userSlice";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch,user) => {
    dispatch(loginStart())
    try{
const response = await publicRequest.post('api/v1/auth/login', user)

dispatch(loginSuccess(response))
    }catch(err){
        dispatch(loginFailure())
    }
}