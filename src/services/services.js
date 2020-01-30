import axios from 'axios'

const http = axios.create({baseURL: 'https://tweet-hack-api.herokuapp.com', withCredentials: true})


const login = ({email, password}) => http.post('/login', {email, password})

export default {
    login
}