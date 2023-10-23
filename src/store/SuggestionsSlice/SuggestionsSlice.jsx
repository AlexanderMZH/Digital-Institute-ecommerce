import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const getSuggestions = createAsyncThunk("suggestions/getSuggestions", async(id = "") => {
    // return fetch("https://digitalamazonproject.azurewebsites.net/api/product/latestproducts")
    return fetch(`https://amazon-digital-prod.azurewebsites.net/api/product/products/${id}`)
    .then(res => res.json())
})

const SuggestionsSlice = createSlice({
    name:"suggestions",
    initialState:{
        suggestionsData:[],
        suggestionsError: false,
        // singleItem: []
    },
    reducers:{
        getSingleProduct: (state, action)=> {
            state.singleItem = []
            state.singleItem = state.suggestionsData.filter(item => item.id === action.payload)
        },
    },
    extraReducers:{
        [getSuggestions.pending]: (state) => {
            state.suggestionsError = false
        },
        [getSuggestions.fulfilled]:(state,action) => {
            state.suggestionsData = action.payload
        },
        [getSuggestions.rejected]:(state) => {
            state.suggestionsError = true
        }
    }
})

export default SuggestionsSlice.reducer