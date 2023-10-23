import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

import { getCartData } from "../store/CartSlice/CartSlice"

import Header from "../Components/Header/Header"
import ResponsiveHeader from "../Components/ResponsiveHeader/ResponsiveHeader"
import Router from "../Router/Router"
import Footer from "../Components/Footer/Footer"

import "./style.scss"
import BurgerMenu from "../Components/BurgerMenu/BurgerMenu"

const Layout = () => {
    const [burgerActive, setBurgerActive] = useState("")
    const [cartAccessToggle, setCartAccessToggle] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const userToken = JSON.parse(localStorage.getItem('userToken'))
    
    useEffect(() => {
        if(userToken){
            dispatch(getCartData())
        }
    },[dispatch,cartAccessToggle])

    const burgerToggle = () => {
        setBurgerActive((preState) => preState === "" ? "active" : "")
    }
    
    return(
        <>
        <div className={`need-auth ${cartAccessToggle}`}>
            <div className='need-auth-container'>
                <div>
                    <h1>You need to be authorized to access your cart</h1>
                </div>
                <div className='need-auth-buttnos'>
                    <div>
                        <button onClick={() => {
                            navigate("/login")
                            setCartAccessToggle('')
                            setBurgerActive("")
                        }}>authorize</button>
                    </div>
                    <div>
                        <button onClick={() => {
                            setCartAccessToggle('')
                        }}>Cloce</button>
                    </div>
                </div>
            </div>
        </div>
        
        <BurgerMenu
        active={burgerActive}
        changeActive={burgerToggle}
        changeCartAccessToggle={setCartAccessToggle}
        />
        
        <div className={`layout ${burgerActive}`}>
            <Header
            changeCartAccessToggle={setCartAccessToggle}
            />
            <ResponsiveHeader
            burgerToggle={burgerToggle}
            changeCartAccessToggle={setCartAccessToggle}
            />
            <Router/>
            <Footer/>
        </div>
        </>
    )
}

export default Layout