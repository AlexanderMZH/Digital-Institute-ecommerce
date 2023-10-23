import { useLocation, useNavigate } from "react-router-dom"

import logo from "../../assets/images/logo.png"
import shopping_cart from "../../assets/images/responsive_header/shopping_cart.png"
import arrow_back from "../../assets/images/responsive_header/arrow_back.png"
import person from "../../assets/images/responsive_header/person.png"
import search from "../../assets/images/responsive_header/search.png"

import "./style.scss"

const ResponsiveHeader = ({burgerToggle, changeCartAccessToggle}) => {
    const navigate = useNavigate()
    const {pathname} = useLocation()

    const userToken = JSON.parse(localStorage.getItem('userToken'))

    if(pathname === "/login" || pathname === "/registration"){
        return
    }
        
    return(
        <>
        <div className="responsive-Header">
            <div className="responsive-Header-container">

                {pathname.includes("list-item") || pathname.includes("cart") || pathname.includes("item") ? null : (
                    <div className="responsive-Header-left">
                        <div className={`burger-menu`} onClick={() => {burgerToggle()}}>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>

                        <div className="responsive-brand" onClick={() => {
                                navigate('/')
                            }}>
                            <img src={logo} alt="logo" />
                        </div>
                    </div>
                    )
                }

                {pathname.includes("list-item") ? (
                    <div className="responsive-Header-left">
                        <div>
                            <img src={arrow_back} alt="" onClick={() => {navigate('/')}} />
                        </div>
                        <div style={{paddingBottom:"4px"}}>
                            <span>
                                Mobile accessory
                            </span>
                        </div>
                    </div>
                ) : (null)}
                
                {pathname.includes('/item') ? (
                    <div className="responsive-Header-left">
                        <div>
                            <img src={arrow_back} alt="" onClick={() => {navigate('/')}} />
                        </div>
                    </div>
                ) : null}

                {pathname.includes("/cart") ? (
                    <div className="responsive-Header-left">
                        <div>
                            <img src={arrow_back} alt="" onClick={() => {navigate('/')}} />
                        </div>
                        <div style={{paddingBottom:"4px"}}>
                            <span>
                                Shopping cart
                            </span>
                        </div>
                    </div>
                ) : (null)}

                {pathname.includes("cart") ? null : (
                    <div className="responsive-Header-right">
                        <div>
                            <img src={shopping_cart} alt="logo" onClick={() => {
                                if(!userToken){
                                    changeCartAccessToggle("restrict")
                                }else{
                                    navigate('/cart')
                                }
                                }} />
                        </div>

                        <div onClick={() => {
                                    navigate('/')
                                }}>
                            <img src={person} alt="logo" />
                        </div>
                    </div>
                )}
                
            </div>

            {pathname.includes("cart") || pathname.includes("/item") ? 
                null : (
                <div className="responsive-Header-search">
                    <div>
                        <img src={search} alt="" />
                        <input type="text" placeholder="Search" />
                    </div>
                </div>
                )
            }
        </div>
        </>

    )
}

export default ResponsiveHeader