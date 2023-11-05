import { useState} from 'react'
import { useSelector } from "react-redux/es/hooks/useSelector"
import { useNavigate } from "react-router-dom"

import business from "../../assets/images/burger_menu/business.png"
import favorite_border from "../../assets/images/burger_menu/favorite_border.png"
import headset_mic from "../../assets/images/burger_menu/headset_mic.png"
import home from "../../assets/images/burger_menu/home.png"
import language from "../../assets/images/burger_menu/language.png"
import list from "../../assets/images/burger_menu/list.png"
import login_avatar from "../../assets/images/burger_menu/login_avatar.png"
import mycart from "../../assets/images/icons/MyCart.png"

import "./style.scss"

const BurgerMenu = ({active, changeActive, changeCartAccessToggle}) => {

    const {cartData} = useSelector(state => state.cart)
    const navigate = useNavigate()
    const userToken = JSON.parse(localStorage.getItem('userToken'))

    const [logOutToggle, setLogOutToggle] = useState("in")
    
    const logOut = () => {
        localStorage.removeItem("userToken")
        setLogOutToggle("in")
        changeActive('')
        navigate("/")
    }
    
    return(
        <>
        <div className={`burger-menu-container ${active}`}>
            <div className="burger-user">
                <div>
                    <img src={login_avatar} alt="user" />
                </div>
                {userToken ? (<span>Hello User</span>) : (
                <div className="burger-auth">
                    <div onClick={() => {
                        navigate('/login')
                        changeActive()
                    }}>
                        <span>
                            Sing in |
                        </span>
                    </div>
                    <div onClick={() => {
                        navigate('/registration')
                        changeActive()
                    }}>
                        <span>
                            Register
                        </span>
                    </div>
                </div>
                )}
            </div>
            <div className="burger-icons">
                <ul>
                    <li onClick={() => {
                        navigate('/')
                        changeActive()
                    }}>
                        <div>
                            <img src={home} alt="home" />
                        </div>
                        <div>
                            <span>Home</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <img src={list} alt="categories" />
                        </div>
                        <div>
                            <span>Categories</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <img src={favorite_border} alt="favorites" />
                        </div>
                        <div>
                            <span>Favorites</span>
                        </div>
                    </li>
                    <li onClick={() => {
                        if(!userToken){
                            changeCartAccessToggle("restrict")
                            return
                        }else{
                            navigate('/cart')
                            changeActive()
                        }
                    }}>
                        <div>
                            <img src={mycart} alt="my cart" />
                        </div>
                        <div id="responsive-mycart">
                            <div>
                                <span>My cart</span>
                            </div>
                            { !userToken || !cartData.length ? (null) : (
                            <div id="responsive-cart-item-quantity">
                                <span>
                                    {cartData.length}
                                </span>
                            </div>
                            )}
                        </div>
                    </li>
                </ul>
                <ul>
                    <li>
                        <div>
                            <img src={language} alt="language" />
                        </div>
                        <div>
                            <span>English | USD</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <img src={headset_mic} alt="contact" />
                        </div>
                        <div>
                            <span>Contact us</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <img src={business} alt="about" />
                        </div>
                        <div>
                            <span>About</span>
                        </div>
                    </li>
                </ul>
                <ul>
                    <li>
                        <div>
                            <span>
                                User agreement
                            </span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span>
                                Partnership
                            </span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span>
                                Privacy policy
                            </span>
                        </div>
                    </li>
                    {
                        userToken ? (
                            <>
                            <li>
                                <button onClick={() => {
                                    setLogOutToggle("out")
                                }}>
                                    Log out
                                </button>
                            </li>
                            <div id={logOutToggle}>
                                <div className='out-container'>
                                    <div>
                                        <h1>Log Out?</h1>
                                    </div>
                                    <div className='out-buttnos'>
                                        <div>
                                            <button onClick={() => {logOut()}}>Yes</button>
                                        </div>
                                        <div>
                                            <button onClick={() => {setLogOutToggle("in")}}>No</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </>
                        ) : (null)
                    }
                </ul>
            </div>
        </div>
        <div className={`burger-menu-container-right ${active}`} onClick={() => {
            changeActive()
        }}>
        </div>
        </>
    )
}

export default BurgerMenu