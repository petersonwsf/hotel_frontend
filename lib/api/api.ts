import axios from "axios";

export const api = axios.create({
    baseURL: '/api',
})

export const apiServer = axios.create({
    baseURL: 'http://localhost:3000/api'
})