import axios from "axios";

export const api = axios.create({
    // baseURL: 'https://employee-management-147.herokuapp.com/api/',
    baseURL: 'http://localhost:9092/api/',
})