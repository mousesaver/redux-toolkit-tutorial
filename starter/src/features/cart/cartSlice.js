import  { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import cartItems from "../../cartItems"
const url = 'https://course-api.com/react-useReducer-cart-project'
const initialState = {
    cartItems: [],
    amount: 4,
    total: 0,
    isLoading: true
}

export const getCartItems = createAsyncThunk('cart/GetCartItems', () => {
    return fetch(url)
        .then((resp) => resp.json())
        .catch((err) => console.log(err))
})

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = []
            // return {cartItems: []}
        },
        removeItem: (state, action) => {
            const itemId = action.payload
            state.cartItems = state.cartItems.filter((item) => item.id != itemId
            )
        },
        increaseAmount: (state, {payload}) => {
            const item = state.cartItems.find((item) => item.id == payload)
            item.amount += 1
        },
        decreaseAmount: (state, {payload}) => {
            const item = state.cartItems.find((item) => item.id == payload)
            item.amount -= 1
        },
        calculateTotals: (state) => {
            let amount = 0
            let total = 0
            state.cartItems.forEach((item) => {
                amount += item.amount
                total += item.price * item.amount
            })
            state.amount = amount
            state.total = total
        }
    },
    extraReducers: {
        [getCartItems.pending]: (state) => {
            state.isLoading = true
        },
        [getCartItems.fulfilled]: (state, action) => {
            console.log(action)
            state.isLoading = false
            state.cartItems = action.payload
        },
        [getCartItems.rejected]: (state) => {
            state.isLoading = false
        }
    }
})
console.log(cartSlice)
export const {clearCart, removeItem, increaseAmount, decreaseAmount, calculateTotals} = cartSlice.actions
export default cartSlice.reducer