import axios from 'axios'

const instanse = axios.create({
    baseURL: 'https://sportspoll-aa1e5.firebaseio.com/1/',
})

export default instanse
