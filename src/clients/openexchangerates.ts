import axios from 'axios'

export default axios.create({
  baseURL: 'https://openexchangerates.org/api/',
  headers: {
    'Content-type': 'application/json'
  },
})