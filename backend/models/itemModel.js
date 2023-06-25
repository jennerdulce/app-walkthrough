const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        requried: true,
        ref: 'User' // Which MODEL this objectID in type refers to
    },
    text: {
        type: String,
        required: [true, 'Please add text value']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Item', itemSchema)