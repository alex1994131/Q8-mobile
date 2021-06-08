import { combineReducers } from "redux"
import categoriesReducer from "./categories"
import membershipsReducer from "./memberships"
import shopsReducer from "./shops"
import brandsReducer from "./brands"
import authReducer from "./auth"
import productsReducer from "./products"
import appDataReducer from "./appData"

const rootReducer = combineReducers({
    appData: appDataReducer,
    products: productsReducer,
    auth: authReducer,
    memberships: membershipsReducer,
    categories: categoriesReducer,
    shops: shopsReducer,
    brands: brandsReducer,
})

export default rootReducer