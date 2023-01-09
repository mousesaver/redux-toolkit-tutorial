import  { createSlice } from "@reduxjs/toolkit"
import cartItems from "../../cartItems"
const initialState = {
    cartItems: cartItems,
    amount: 4,
    total: 0,
    isLoading: true
}
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
    }
})
console.log(cartSlice)
export const {clearCart, removeItem, increaseAmount, decreaseAmount, calculateTotals} = cartSlice.actions
export default cartSlice.reducer