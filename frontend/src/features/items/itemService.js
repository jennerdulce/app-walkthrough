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
const createItem = async (itemData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    const response = await axios.post(API_URL, itemData, config)

    if (response.data) {
        return response.data
    }
}

// Delete Item
const deleteItem = async (ItemID, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    const response = await axios.delete(API_URL + ItemID, config)

    if (response.data) {
        return response.data
    }
}

const itemService = {
    getItems,
    createItem,
    deleteItem
}

export default itemService