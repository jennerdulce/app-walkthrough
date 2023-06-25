import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import itemService from './itemService'

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    items: [],
}

// Get User Items
export const getItems = createAsyncThunk('item/getItems', async (user, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await itemService.getItems(token)
    } catch (error) {
        const message = ((error.response && error.response.data && error.response.data.message) || error.message || error.toString())
        return thunkAPI.rejectWithValue(message)
    }
})

// Create User Item
export const createItem = createAsyncThunk('item/createItem', async (itemText, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await itemService.createItem(itemText, token)
    } catch (error) {
        const message = ((error.response && error.response.data && error.response.data.message) || error.message || error.toString())
        return thunkAPI.rejectWithValue(message)
    }
})

// Create Delete Item
export const deleteItem = createAsyncThunk('item/deleteGoal', async (itemID, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await itemService.deleteItem(itemID, token)
    } catch (error) {
        const message = ((error.response && error.response.data && error.response.data.message) || error.message || error.toString())
        return thunkAPI.rejectWithValue(message)
    }
})

export const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getItems.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getItems.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.items = action.payload
            })
            .addCase(getItems.rejected, (state, action) => {
                state.items = []
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(createItem.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createItem.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.items.push(action.payload)
            })
            .addCase(createItem.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteItem.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.items = state.items.filter((item) => item._id !== action.payload.id)
            })
            .addCase(deleteItem.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = itemSlice.actions
export default itemSlice.reducer