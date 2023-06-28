import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import iitemmService from './iitemmService'

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    items: [], // Change to lowercase
}

// Get User Items
export const getItems = createAsyncThunk('iitemm/getItems', async (user, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await iitemmService.getItems(token)
    } catch (error) {
        const message = ((error.response && error.response.data && error.response.data.message) || error.message || error.toString())
        return thunkAPI.rejectWithValue(message)
    }
})

// Create User Item
export const createItem = createAsyncThunk('iitemm/createItem', async (iitemmText, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await iitemmService.createItem(iitemmText, token)
    } catch (error) {
        const message = ((error.response && error.response.data && error.response.data.message) || error.message || error.toString())
        return thunkAPI.rejectWithValue(message)
    }
})

// Create Delete Item
export const deleteItem = createAsyncThunk('iitemm/deleteGoal', async (iitemmID, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await iitemmService.deleteItem(iitemmID, token)
    } catch (error) {
        const message = ((error.response && error.response.data && error.response.data.message) || error.message || error.toString())
        return thunkAPI.rejectWithValue(message)
    }
})

export const iitemmSlice = createSlice({
    name: 'iitemm',
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
                state.items = action.payload // Change to lowercase
            })
            .addCase(getItems.rejected, (state, action) => {
                state.items = [] // Change to lowercase
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
                state.items.push(action.payload) /// Change to lowercase
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
                state.items = state.items.filter((iitemm) => iitemm._id !== action.payload.id) // Change to lowercase
            })
            .addCase(deleteItem.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = iitemmSlice.actions
export default iitemmSlice.reducer