import axios from "axios";

const BASE_URL = "http://localhost:5000" || "https://fashionepaserver.onrender.com"
const TOKEN = process.env.TOKEN
export const publicRequest = axios.create({
    baseURL: BASE_URL
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header:{token: TOKEN}
})