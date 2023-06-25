const asyncHandler = require('express-async-handler')

// ** FOR DATABASE **
const Item = require('../models/itemModel')

// @desc Get all items
// @route GET /api/getAllItems
// @access Private

const getAllItems = asyncHandler(async (req, res) => {
    
    const items = await Item.find()
    res.status(200).json(items)
})

// @desc Get user items
// @route GET /api/items
// @access Private

const getItems = asyncHandler(async (req, res) => {
    
    const items = await Item.find({ user: req.user.id })
    res.status(200).json(items)
})

// @desc Create an item
// @route POST /api/items
// @access Private

const setItem = asyncHandler(async (req, res) => {
    // Proper method with middleware
    // ** req.body.text pertains to specific item **
    // ** If Item has no text propety, use a different property within the Item object **
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add text field') // Utilizes new error middleware created
    }


    // MongoDB request
    const item = await Item.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(item)
})

// @desc Update an item
// @route PUT /api/items/:id
// @access Private

const updateItem = asyncHandler(async( req, res) => {
    const item = await Item.findById(req.params.id)
    if(!item){
        res.status(400)
        throw new Error('Goal not found')
    }

    // check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // make sure logged in user matches item to user
    if(item.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.status(200).json(updatedItem)
})

// @desc Delete an item
// @route DELETE /api/items/:id
// @access Private

const deleteItem = asyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id)

    if(!item){
        res.status(400)
        throw new Error('Item not found')
    } 

    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    if(item.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await Item.findByIdAndDelete(req.params.id)

    res.status(200).json({ 
        message: 'Item Deleted',
        id: req.params.id 
    })
})

module.exports = {
    getAllItems,
    getItems,
    setItem,
    updateItem,
    deleteItem
}