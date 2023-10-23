import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { getRecommendedData } from "../../store/RecommendedSlice/RecommendedSlice"
import {getCartData} from "../../store/CartSlice/CartSlice"

import Recommended from "../../Components/Recommended/Recommended"
import CartProduct from "../../Components/CartProduct/CartProduct"

import american from "../../assets/images/cards/american.png"
import apple from "../../assets/images/cards/apple.png"
import master from "../../assets/images/cards/master.png"
import paypal from "../../assets/images/cards/paypal.png"
import visa from "../../assets/images/cards/visa.png"
import message_icon from "../../assets/images/message_icon.png"
import padlock from "../../assets/images/padlock.png"
import truck from "../../assets/images/truck.png"

import arrow_back from "../../assets/images/arrow_back.png"


import "./style.scss"

const Cart = () => {
    const {recommendedData,recommendedError} = useSelector(state => state.recommended)
    const {cartData, cartPrice} = useSelector(state => state.cart)

    const [refresh, setRefresh] = useState(false)
    const [cartError, setCartError] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const removeAllFromCart = (removeAllId) => {
        console.log(removeAllId)
        // const userToken = JSON.parse(localStorage.getItem('userToken'))
        // fetch('https://digitalamazonproject.azurewebsites.net/api/cart/removefromcart',{
        //     method: 'DELETE',
        //     headers: {
        //     'Content-Type': 'application/json',
        //     Authorization: `Bearer ${userToken}`
        //     },
        //     body: JSON.stringify({
        //         productId: removeAllId
        //     })
        // })
        // .then(res => res.json())
        // .then(res => console.log(res))
    }

    const removeFromCart = async (id) => {
        const userToken = JSON.parse(localStorage.getItem('userToken'))
        try {
            const res = await fetch('https://amazon-digital-prod.azurewebsites.net/api/cart/removefromcart', {
                method: 'DELETE',
                headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userToken}`
                },
                body: JSON.stringify({
                    productId: id
                })
            })
            setRefresh((preState) => preState === false ? true : false)
        }
        catch (error){
        }
    }

    const addToCart = async (itemId) => {
        if(cartData.map((item) => item.id).includes(itemId)){
            return
        }
        const userToken = JSON.parse(localStorage.getItem('userToken'))
        try {
            const res = await fetch('https://amazon-digital-prod.azurewebsites.net/api/cart/addincart', {
                method: 'POST',
                headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userToken}`
                },
                body: JSON.stringify({
                    productId: itemId
                })
            })
            setRefresh((preState) => preState === false ? true : false)
            setCartError(false)
        }
        catch (error) {
            setCartError(true)
        }
    }

    useEffect(() => {
        setCartError(false)
        dispatch(getCartData())
    },[dispatch, refresh])
    
    useEffect(() => {
        dispatch(getRecommendedData())
    },[dispatch])

    return(
        <>
        <section className="cart-section">
            <div className="cart-container">
                <div className="cart-item-quantity">
                    <h3>
                        My cart 
                    </h3>
                    <h3>
                        ({!cartData.length ? 0 : cartData.length})
                    </h3>
                </div>

                <div className="cart-item-container">
                    <div className="cart-items-list">
                        {cartData && cartData.length ? (
                            <ul>
                                {cartData.map((item) => {
                                    return(
                                        <li key={item.id}>
                                            <CartProduct
                                            image={item.images}
                                            name={item.name}
                                            price={item.price}
                                            id={item.id}
                                            removeFromCart={removeFromCart}
                                            />
                                        </li>
                                    )
                                })}

                            </ul>
                        ) : (
                            <div className="empty-cart">
                                <span>
                                    No items in the cart
                                </span>
                            </div>
                        )}
                        <div className="cart-items-list-buttons">
                            <div className="back-home">
                                <button onClick={() => {
                                    navigate('/')
                                }}>
                                    <img src={arrow_back} alt=""/>
                                    Back to shop
                                </button>
                            </div>
                            {cartData.length ? (
                                <div className="clear">
                                    <button onClick={() => {
                                        removeAllFromCart(
                                            cartData.map((item) => item.id)
                                        )
                                    }}>
                                        Removea All
                                    </button>
                                </div>
                            ) : (
                                null
                            )}
                        </div>
                    </div>

                    <div className="checkout-container">
                        <div className="coupon">
                            <div className="coupon-title">
                                <span>
                                    Have a coupon?
                                </span>
                            </div>
                            <div className="coupon-input">
                                <div>
                                    <input type="text" placeholder="Add coupon"/>
                                </div>
                                <div>
                                    <button>
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="checkout">
                            <div className="checkout-prices">
                                <ul>
                                    <li>
                                        <div className="text">
                                            <span>
                                            Subtotal:
                                            </span>
                                        </div>
                                        <div className="subtotal">
                                            <span>
                                                {Math.floor(cartPrice)}
                                            </span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="text">
                                            <span>
                                            Discount:
                                            </span>
                                        </div>
                                        <div className="discount">
                                            <span>
                                            - $60.00
                                            </span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="text">
                                            <span>
                                            Tax:
                                            </span>
                                        </div>
                                        <div className="tax">
                                            <span>
                                            + $14.00
                                            </span>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="checkout-total">
                                <div className="total">
                                    <span>
                                    Total:
                                    </span>
                                    <span>
                                    $1357.97
                                    </span>
                                </div>
                                <div className="checkout-button">
                                    <div>
                                        <button>
                                            Checkout
                                        </button>
                                    </div>
                                    <div className="card-icons">
                                        <ul>
                                            <li>
                                                <div>
                                                    <img src={american} alt="american express" />
                                                </div>
                                            </li>
                                            <li>
                                                <div>
                                                    <img src={master} alt="master card" />
                                                </div>
                                            </li>
                                            <li>
                                                <div>
                                                    <img src={paypal} alt="paypal" />
                                                </div>
                                            </li>
                                            <li>
                                                <div>
                                                    <img src={visa} alt="visa card" />
                                                </div>
                                            </li>
                                            <li>
                                                <div>
                                                    <img src={apple} alt="apple pay" />
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="customer-support-container">
                <ul>
                    <li>
                        <div className="customer-support">
                            <div className="customer-support-image">
                                <img src={padlock} alt="padlock" />
                            </div>
                            <div className="customer-support-text">
                                <div className="customer-support-text-black">
                                    <span>
                                    Secure payment
                                    </span>
                                </div>
                                <div className="customer-support-text-grey">
                                    <span>
                                    Have you ever finally just 
                                    </span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="customer-support">
                            <div className="customer-support-image">
                                <img src={message_icon} alt="message" />
                            </div>
                            <div className="customer-support-text">
                                <div className="customer-support-text-black">
                                    <span>
                                    Secure payment
                                    </span>
                                </div>
                                <div className="customer-support-text-grey">
                                    <span>
                                    Have you ever finally just 
                                    </span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="customer-support">
                            <div className="customer-support-image">
                                <img src={truck} alt="truck" />
                            </div>
                            <div className="customer-support-text">
                                <div className="customer-support-text-black">
                                    <span>
                                    Secure payment
                                    </span>
                                </div>
                                <div className="customer-support-text-grey">
                                    <span>
                                    Have you ever finally just 
                                    </span>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <section className='recommended-section'>
                <div className='recommended-section-container cart-recommended-container'>
                    <div className='recommended-section-text'>
                        <h3>
                            Saved for later
                        </h3>
                    </div>
                    {recommendedData && recommendedData.length ? (

                    <div className='recommended-items cart-recommended-items'>
                        <ul>
                            {recommendedData.map((item) => {
                                return(
                                    <li key={item.id}>
                                        <Recommended
                                        image = {item.images}
                                        price={item.price}
                                        name={item.name}
                                        id={item.id}
                                        addToCart={addToCart}
                                        cartError={cartError}
                                        />
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    ): (
                        !recommendedError ? (
                            <h1 className='loading'>
                            Loading data...
                            </h1>
                        ) : (
                            <h1 className='error'>
                                Something went wrong...
                            </h1>
                        )
                    )}
            </div>
        </section>
    </section>
        </>
    )
}

export default Cart