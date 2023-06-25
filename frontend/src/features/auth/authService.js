import axios from 'axios'

// Makes request to endpoint api/users/
const API_URL = 'api/users/'

// Register user
const registerUser = async (userData) => {
    const response = await axios.post(API_URL, userData)

    // When making an axios request, returns an object (reponse) with a property of 'data'
    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Logout User
const logout = () => {
    localStorage.removeItem('user')
}

// Login
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const authService = {
    registerUser,
    logout,
    login
}

export default authService