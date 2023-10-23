import { Outlet, Navigate } from "react-router-dom"


const PrivateRoutes = () =>{

    const userToken = JSON.parse(localStorage.getItem("userToken"))

    return userToken ? <Outlet /> : <Navigate to={"/"} />
}

export default PrivateRoutes