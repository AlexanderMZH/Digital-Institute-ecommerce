import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"

export const getCategories = createAsyncThunk("categories/getCategories", async () => {
    return fetch("https://amazon-digital-prod.azurewebsites.net/api/product/categories")
    .then (res => res.json()) 
    .catch(err => {throw Error(err)})
})

const CategoriesSlice = createSlice({
    name: "categories",
    initialState:{
        categories:[],
        categoriesError: false,
        categoryId: ""
    },
    reducers:{
        getSearchCategoryId: (state,action) => {
            state.categoryId = action.payload
        }
    },
    extraReducers:{
        [getCategories.pending]: (state) => {
            state.categoriesError = false
        },
        [getCategories.fulfilled]: (state,action) => {
            state.categories = action.payload
        },
        [getCategories.rejected]: (state) => {
            state.categoriesError = true
        }
    }
})

export default CategoriesSlice.reducer

export const {getSearchCategoryId} = CategoriesSlice.actions