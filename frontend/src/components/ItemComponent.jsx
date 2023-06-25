import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteItem } from '../features/items/itemSlice'

function ItemComponent({ item }) {
    const dispatch = useDispatch()

    return (
        <>
            <div className='goal'>
                <div>{new Date(item.createdAt).toLocaleString('en-US')}</div>
                <h2>{item.text}</h2>
                <button onClick={() => dispatch(deleteItem(item._id))} className='close'>
                    X
                </button>
            </div>
        </>
    )
}

export default ItemComponent