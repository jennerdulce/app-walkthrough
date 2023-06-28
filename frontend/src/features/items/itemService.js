import axios from 'axios'
const API_URL = 'api/items/'

// Display User Items
const getItems = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    const response = await axios.get(API_URL, config)

    if (response.data) {
        return response.data
    }
}

// Create Item
const createItem = async (iitemmData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    const response = await axios.post(API_URL, iitemmData, config)

    if (response.data) {
        return response.data
    }
}

// Delete Item
const deleteItem = async (iitemmID, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    const response = await axios.delete(API_URL + iitemmID, config)

    if (response.data) {
        return response.data
    }
}

const iitemmService = {
    getItems,
    createItem,
    deleteItem
}

export default iitemmService