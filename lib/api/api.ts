import axios from "axios";

export const api = axios.create({
    baseURL: '/api/proxy',
})

export const apiServer = axios.create({
    baseURL: 'http://localhost:3000/api'
})
