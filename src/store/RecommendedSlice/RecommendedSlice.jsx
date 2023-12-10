import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const getRecommendedData = createAsyncThunk("recommended/getRecommendedData", async() => {
    return fetch("https://ngglobalwebapi20231210182820.azurewebsites.net/api/product/mostdemandproducts")
    .then(res => res.json())
})

const RecommendedSlice= createSlice({
    name:"recommended",
    initialState:{
        recommendedData:[],
        recommendedError:false
    },
    extraReducers:{
        [getRecommendedData.pending]: (state) => {
            state.recommendedError = false
        },
        [getRecommendedData.fulfilled]:(state, action) =>{
            state.recommendedData = action.payload
        },
        [getRecommendedData.rejected]: (state) => {
            state.recommendedError = true
        }
    }
})

export default RecommendedSlice.reducer