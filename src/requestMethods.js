import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1"
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmRmMTU2YzU2ZTZkNjQyMzM1OTYwOCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NjgxNDk2MDV9.vKoIdBcf2w-l8zDLp6M_6o_Wtv7zHEhaVW5xW-nFAtI"
export const publicRequest = axios.create({
    baseURL: BASE_URL
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header:{token: TOKEN}
})