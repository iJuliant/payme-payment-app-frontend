import axios from 'axios'
import Cookie from 'js-cookie'

let dataToken = ''
const setToken = (token) => {
  dataToken = token
}

const axiosApiIntances = axios.create ({
  baseURL: process.env.BASEURL
})

axiosApiIntances.interceptors.request.use(
  function(config) {
    config.headers = {
      Authorization: `Bearer ${dataToken}`
    }
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

axiosApiIntances.interceptors.response.use(
  function(response) {
    return response
  },
  function(error) {
    if (error.response.status === 403) {
      try {
        console.log(err)
        Cookie.remove('token')
        Cookie.remove('user')
        alert('You need to login first')
        window.location.href = '/'
      } catch(err) {
        console.log(err.message)
      }
    }
    return Promise.reject(err)
  }
)

export default { axiosApiIntances, setToken }