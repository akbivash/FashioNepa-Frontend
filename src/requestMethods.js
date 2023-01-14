import axios from "axios";

const TOKEN = process.env.TOKEN
export const publicRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
    
})

export const userRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    header:{token: TOKEN}
})
