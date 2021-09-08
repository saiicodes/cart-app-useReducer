import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  //to clear the cart that is to set the cart to an empty array
  const clearCart = () => {
    dispatch({type: 'CLEAR_CART'})
  }

  //to remove item
  const remove = (id) => {
    dispatch({type: 'REMOVE', payload: id})
  }

//to increase the number of item the cart
const increase = (id) => {
  dispatch({type: 'INCREASE', payload: id})
}

//to decrease the number of item in the cart
const decrease = (id) => {
  dispatch({type: 'DECREASE', payload: id})
}

//fetching data using the useReducer hook
const fetchData = async () => {
  dispatch({type: 'LOADING'})
  const response = await fetch(url)
  const cart = await response.json()
  dispatch({type: 'DISPLAY_ITEMS', payload: cart})
}

useEffect(() => {
  fetchData()
}, []);

useEffect(() => {
  dispatch({type: 'GET_TOTALS'})
}, [state.cart]);


  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        increase,
        decrease
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
