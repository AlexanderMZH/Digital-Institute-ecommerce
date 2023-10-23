import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCartData = createAsyncThunk("cart/getCartData", async () => {
    const userToken = JSON.parse(localStorage.getItem('userToken'))
    return fetch('https://amazon-digital-prod.azurewebsites.net/api/cart/getmycartproducts',{
        headers: { 
        Authorization: `Bearer ${userToken}`
        },
    })
    .then(res => res.json())
})

const addToCart = createAsyncThunk("cart/addToCart", async (itemId) => {
    const userToken = JSON.parse(localStorage.getItem('userToken'))
    return fetch('https://amazon-digital-prod.azurewebsites.net/api/cart/addincart', {
        method: 'POST',
        headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
        },
        body: JSON.stringify({
            productId: itemId
        })
    })
})

const CartSlice = createSlice({
    name:"cart",
    initialState:{
        cartData:[],
        cartPrice:[],
        cartDataError: false
    },
    reducers:{
        addToCart: () => {

        }
    },
    extraReducers:{
        [addToCart.fulfilled]: (state) => {

        },
        [getCartData.pending]: (state) => {
            state.cartDataError = false
        },
        [getCartData.fulfilled]: (state,action) =>{
            state.cartData = action.payload
            state.cartPrice = state.cartData.reduce((acc, item) => item.price + acc, 0)
        },
        [getCartData.rejected]: (state) => {
            state.cartData = true
        }
    }
})

export default CartSlice.reducer
