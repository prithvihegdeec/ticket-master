import Axios from 'axios'

const axios = Axios.create({
    //baseURL: 'https://dct-ticket-master.herokuapp.com'
    baseURL: 'loclhost://3007'
})

export default axios
