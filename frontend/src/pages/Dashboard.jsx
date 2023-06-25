import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getItems, reset } from '../features/items/itemSlice'
import ItemComponent from '../components/ItemComponent'
import ItemForm from '../components/ItemForm'
import Spinner from '../components/Spinner'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { items, isLoading, isError, message } = useSelector((state) => state.item)

  useEffect(() => {
    if(isError) {
      console.log('ERROR: ', message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getItems())

    return () => {
      dispatch(reset())
    }
  }, [user, isError, message, dispatch, navigate])

  if(isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section>
        <h1>Welcome {user && user.name}</h1> {/* if user, then display username */}
        <p>Items Dashboard</p>
      </section>

      <ItemForm />

      <section>
        {items.length > 0 ? (
          <div className="goals">
            {items.map((item) => (
              <ItemComponent key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <h3>You have not set any items yet</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard