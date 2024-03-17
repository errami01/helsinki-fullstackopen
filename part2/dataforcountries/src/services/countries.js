import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const getAll = ()=>axios.get(baseUrl).then(resp => resp.data)

export default {
    getAll
}