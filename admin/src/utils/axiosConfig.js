import axios from 'axios'

const axiosConfig = axios.create({
    baseURL: "http://localhost:8800/api"
})

export default axiosConfig;