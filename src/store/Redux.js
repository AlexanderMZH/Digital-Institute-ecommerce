
import { configureStore } from "@reduxjs/toolkit";

import CategoriesSlice from "./CategoriesSlice/CategoriesSlice";
import OffersSlice from "./OffersSlice/OffersSlice";
import SuggestionsSlice from "./SuggestionsSlice/SuggestionsSlice";
import RecommendedSlice from "./RecommendedSlice/RecommendedSlice";
import CartSlice from "./CartSlice/CartSlice";
import CartCheck from "./CartCheck/CartCheck";

const store = configureStore({
    reducer:{
        categories: CategoriesSlice,
        offers: OffersSlice,
        suggestions: SuggestionsSlice,
        recommended: RecommendedSlice,
        cart: CartSlice,
        cartCheck: CartCheck
    }
})

export default store
