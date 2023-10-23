import React from "react"
import { useLocation, useNavigate } from "react-router-dom"

import cart from "../../assets/images/cart.png"

import "./style.scss"

const Recommedned = ({image, price, name, id, addToCart, cartError}) => {

    const navigate = useNavigate()
    const {pathname} = useLocation()

    return(
        <>
        <div className='recommended-item-container' onClick={() => {
            navigate(`/item/${id}`)
        }}>
            <div className='recommended-item-image'>
                <img src={image} alt="product" />
            </div>
            <div className='recommended-item-description'>
                <div className='recommended-item-price'>
                    <span>
                        ${price}
                    </span>
                </div>
                <div className='recommended-item-name'>
                    <span>
                        {name}
                    </span>
                </div>
            </div>
        </div>
        {pathname.includes("/cart") ? (
            <div className="cart-li-button">
                <button onClick={() => {
                    addToCart(id)
                }}>
                    <img src={cart} alt="" />
                    {!cartError ? (
                        <>
                            {/* {isInCart ? (
                                <span>
                                    Item is in cart
                                </span>
                            ) : (
                            <span>
                                Move to cart
                            </span>
                        )} */}
                            <span>
                                Move to cart
                            </span>
                        </>
                    ) : (
                        <span style={{
                            color: "red"
                        }}>
                            Something Wrong
                        </span>
                    )}
                </button>
            </div>
        ) : (null)}
        </>
    )
}

function areEqual (preValue,postValue) {
    if(preValue.id !== postValue.id){
        return false
    }else{return true}
}

export default React.memo (Recommedned, areEqual)