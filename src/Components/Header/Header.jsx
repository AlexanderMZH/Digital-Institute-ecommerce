import { useLocation, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { useDispatch } from "react-redux"
import { useEffect } from "react"

import { getCartData } from "../../store/CartSlice/CartSlice"

import logo from "../../assets/images/logo.png"
import Orders from "../../assets/images/icons/Orders.png"
import Message from "../../assets/images/icons/Message.png"
import MyCart from "../../assets/images/icons/MyCart.png"
import Profile from "../../assets/images/icons/Profile.png"

import "./style.scss"

const Header =({changeCartAccessToggle}) => {
    const {cartData} = useSelector(state => state.cart)
    const {isInCart} = useSelector(state => state.cartCheck)
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {pathname} = useLocation()
    const userToken = JSON.parse(localStorage.getItem('userToken'))

    useEffect(() => {
        if(userToken){
            dispatch(getCartData())
        }
    },[dispatch,isInCart])
    
    if(pathname.includes("login") || pathname.includes("registration")){
        return
    }
    
    return (
        <header>
            <div className="header">
                <div className="brand" onClick={() => {
                    navigate('/')
                }}>
                    <img src={logo} alt="logo" />
                </div>
                
                {
                    pathname.includes("/cart") ? null : (
                    <div className="search">
                        <input type="text" name="" placeholder="search" />
                        <select id="laptop">
                            <option value="volvo">all categories</option>
                            <option value="volvo">Volvo</option>
                            <option value="saab">Saab</option>
                            <option value="mercedes">Mercedes</option>
                            <option value="audi">audi</option>
                        </select>
                        <button type="button">
                            Search
                        </button>
                    </div>
                    )
                }
                <div className="icons">
                    <ul>
                        <li>
                            <div>
                                <img src= {Profile} alt="profile" />
                            </div>
                            <div>
                                <span>profile</span>
                            </div>
                        </li>
                        <li>
                            <div>
                                <img src={Message} alt="message" />
                            </div>
                            <div>
                                <span>massage</span>
                            </div>
                        </li>
                        <li>
                            <div>
                                <img src={Orders} alt="orders" />
                            </div>
                            <div>
                                <span>orders</span>
                            </div>
                        </li>
                        <li id="my-cart-icon" onClick={() => {
                            if(!userToken){
                                changeCartAccessToggle("restrict")
                                return
                            }
                            navigate('/cart')
                        }}>
                            <div>
                                <img src={MyCart} alt="my cart" />
                            </div>
                            <div>
                                <span>my cart</span>
                                    { !userToken || !cartData.length ? (null) : (
                                    <div id="cart-item-quantity">
                                        <span>
                                            {cartData.length}
                                        </span>
                                    </div>
                                    )}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {
                pathname.includes("cart") ? null : (
                <section className="navigation-section">
                    <div className="navigation">
                        <div className="navigation-container">
                            <div className="hamburger-menu">
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                            <div className="navigation-itmes">
                                <h6>all category</h6>
                                <h6 id="itme-h6">hot offers</h6>
                                <h6>gift boxes</h6>
                                <h6>projects</h6>
                                <h6>menu itmes</h6>
                                <select name="help" id="help">
                                    <option value="help">help</option>
                                    <option value="help">help</option>
                                    <option value="help">help</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <select name="languages" id="languages">
                                <option value="english">English,USD</option>
                                <option value="english">English,USD</option>
                                <option value="english">English,USD</option>
                            </select>
                            <select name="ship" id="ship">
                                <option value="ship to">Ship to</option>
                                <option value="ship to">Ship to</option>
                                <option value="ship to">Ship to</option>
                            </select>
                        </div>
                    </div>
                </section>
                )
            }
            
        </header>
    )
}

export default Header