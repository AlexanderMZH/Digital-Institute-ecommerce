import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const getOffers = createAsyncThunk("offers/getOffers", async () => {
    return fetch("https://amazon-digital-prod.azurewebsites.net/api/product/offers")
    .then(res => res.json())
})

const OffersSLice = createSlice({
    name:"offers",
    initialState:{
        offersData:[],
        offersError: false,
    },
    extraReducers:{
        [getOffers.pending]: (state) => {
            state.offersError = false
        },
        [getOffers.fulfilled]:(state,action)=>{
            state.offersData = action.payload
        },
        [getOffers.rejected]: (state) => {
            state.offersError = true
        }
    }
})

export default OffersSLice.reducer