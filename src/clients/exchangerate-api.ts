import axios from 'axios'

export default axios.create({
  baseURL: 'https://api.exchangerate-api.com/v4/latest/',
  headers: {
    'Content-type': 'application/json'
  },
})