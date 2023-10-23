import { Routes,Route } from "react-router-dom"

import PrivateRoutes from "./PrivateRoutes"
import Authentication from "../Pages/Authentication/Authentication"
import Login from "../Pages/Login/Login"
import Main from "../Pages/Main/Main"
import ListItems from "../Pages/ListItems/ListItems"
import Item from "../Pages/Item/Item"
import Cart from "../Pages/Cart/Cart"
import NotFound from "../Pages/NotFound/NotFound"

const Router = () => {
    return(
        <Routes>
            <Route path="/" element={<Main/>} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/registration" element={<Authentication/>} />
            <Route path="/list-item" element={<ListItems/>}/>
            <Route path="/item/:itemId" element={<Item/>}/>
            <Route path="*" element={<NotFound/>}/>

            <Route element={<PrivateRoutes/>}>
                <Route path="/cart" element={<Cart/>}/>
            </Route>
            
        </Routes>
    )
}

export default Router