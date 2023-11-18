import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import { getSuggestions } from "../../store/SuggestionsSlice/SuggestionsSlice"
import { getRecommendedData } from "../../store/RecommendedSlice/RecommendedSlice"
import { getCartCheck } from "../../store/CartCheck/CartCheck"

import Recommeded from "../../Components/Recommended/Recommended"
import YouMayLike from "../../Components/YouMayLike/YouMayLike"

import heartIcon from "../../assets/images/heart.png"
import language from "../../assets/images/language.png"
import message from "../../assets/images/message.png"
import sold from "../../assets/images/sold.png"
import stars from "../../assets/images/stars.png"
import tick from "../../assets/images/tick.png"

import "./style.scss"

const Item = () => {
    const [cartAccessToggle, setCartAccessToggle] = useState("")
    
    const [itemIndex, setItemIndex] = useState(0)
    const [refresh, setRefresh] = useState(false)
    const [error, setError] = useState()
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    const {itemId} = params
    
    const {recommendedData,recommendedError} = useSelector(state => state.recommended)
    const {suggestionsData,suggestionsError} = useSelector(state => state.suggestions)
    const {isInCart} = useSelector(state => state.cartCheck)
    
    const userToken = JSON.parse(localStorage.getItem('userToken'))
    
    const addToCart = async () => {
        try {
            await fetch('https://digitalinstitute-amazon.azurewebsites.net/api/cart/addincart', {
                method: 'POST',
                headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userToken}`
                },
                body: JSON.stringify({
                    productId: itemId
                })
            })
            setRefresh((preState) => !preState)
            setError(false)
        }
        catch (error) {
            setError(true)
        }
    }
        
    useEffect(() => {
        if(userToken){
            setError(false)
            dispatch(getCartCheck(itemId))
        }
    },[dispatch, itemId, refresh,userToken])
    
    useEffect(() => {
        dispatch(getSuggestions(itemId))
        dispatch(getRecommendedData())
    },[dispatch, itemId])
        
    return(
        <>        
        <section className="item-details-section">
            <div className={`need-auth ${cartAccessToggle}`}>
                <div className='need-auth-container'>
                    <div>
                        <h1>You need to be authorized to access your cart</h1>
                    </div>
                    <div className='need-auth-buttnos'>
                        <div>
                            <button onClick={() => {
                                setCartAccessToggle('')
                                navigate("/login")
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
        {suggestionsData && suggestionsData.id ? (
            <React.Fragment>
            <div className="item-detail">
                <div className="item-image-container">
                    <div className="item-main-image">
                        <img src={suggestionsData.images[itemIndex]} alt=""/>
                    </div>
                    <div className="item-lawer-images">
                        <ul>
                            {suggestionsData && suggestionsData.images.length ? (
                                <React.Fragment>
                                {suggestionsData.images.map((item,index) => {
                                return(
                                <li key={index}>
                                    <img src={item} alt="item" onClick={() => {setItemIndex(index)}}/>
                                </li>
                                )
                            })}
                                </React.Fragment>
                            ):(null)}
                        </ul>
                    </div>
                    <div className="movetocart">
                        <div>
                            {!error ? (
                                <>
                                {isInCart ? (
                                <button style={{
                                    opacity:"0.5"
                                }}>
                                    Already in cart
                                </button>
                                ) : (
                                <button onClick={() => {
                                    if(!userToken){
                                        setCartAccessToggle("restrict")
                                        return
                                    }
                                    addToCart()
                                    }}>
                                    Move to Cart
                                </button>
                                )}
                                </>
                            ) : (
                                <button onClick={() => {}}>
                                    Something wrong
                                </button>
                            )}
                        </div>
                        <div id="save-later">
                            <img src={heartIcon} alt="" />
                        </div>
                    </div>
                </div>
                    
                <div className="item-details-container">
                    <div className="in-stock">
                        <span>In stock</span>
                    </div>
                    
                    <div className="item-name">
                    {suggestionsData && suggestionsData.id ? (
                        <h4>
                            {suggestionsData.name}
                        </h4>
                    ): null}
                    </div>
                    
                    <div className="item-review-container">
                        <ul>
                            <li>
                                <div className="item-stars">
                                     <img src={stars} alt="stars" />
                                </div>
                                <div>
                                    <span>9.3</span>
                                </div>
                            </li>
                            <li>
                                <div className="review-image">
                                    <img src={message} alt="message" />
                                </div>
                                <div className="review-span">
                                    <span>32 reviews</span>
                                </div>
                            </li>
                            <li>
                                <div className="sold-image">
                                    <img src={sold} alt="sold" />
                                </div>
                                <div className="sold-text">
                                    <span>154 sold</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="item-price-container">
                        <div className="item-price-sections">
                            <div className="first-price">
                                <div>
                                {suggestionsData && suggestionsData.id ? (
                                            <h5>
                                                ${suggestionsData.price}
                                            </h5>
                                        ): null}
                                    <span>
                                        50-100 pcs
                                    </span>
                                </div>
                            </div>
                            <div className="second-price">
                                <div>
                                    <h5>
                                        $90.00
                                    </h5>
                                    <span>
                                        100-700 pcs
                                    </span>
                                </div>
                            </div>
                            <div className="third-price">
                                <div>
                                    <h5>
                                        $78.00
                                    </h5>
                                    <span>
                                        700+ pcs
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="movetocart responsive">
                        <div>
                            {!error ? (
                                <>
                                {isInCart ? (
                                <button style={{
                                    opacity:"0.5"
                                }}>
                                    Already in cart
                                </button>
                                ) : (
                                <button onClick={() => {
                                    if(!userToken){
                                        setCartAccessToggle("restrict")
                                        return
                                    }
                                    addToCart()
                                    }}>
                                    Move to Cart
                                </button>
                                )}
                                </>
                            ) : (
                                <button onClick={() => {}}>
                                    Something wrong
                                </button>
                            )}
                        </div>
                        <div id="save-later">
                            <img src={heartIcon} alt="" />
                        </div>
                    </div>

                    <div className="item-detail-materials border">
                        <div className="material-key">
                            <span>
                                Price: 
                            </span>
                        </div>
                        <div className="material-value">
                        {suggestionsData && suggestionsData.id ? (
                            <span>
                                ${suggestionsData.price}
                            </span>
                        ): null}
                        </div>
                    </div>
                    <div className="item-detail-materials">
                        <div className="material-key">
                            <span>
                                Type: 
                            </span>
                        </div>
                        <div className="material-value">
                            <span>
                                Classic  shoes 
                            </span>
                        </div>
                    </div>
                    <div className="item-detail-materials">
                        <div className="material-key">
                            <span>
                                Material: 
                            </span>
                        </div>
                        <div className="material-value">
                            <span>
                                Plastic material 
                            </span>
                        </div>
                    </div>
                    <div className="item-detail-materials border">
                        <div className="material-key">
                            <span>
                                Design: 
                            </span>
                        </div>
                        <div className="material-value">
                            <span>
                                Modern nice 
                            </span>
                        </div>
                    </div>
                    <div className="item-detail-materials">
                        <div className="material-key">
                            <span>
                                Customization: 
                            </span>
                        </div>
                        <div className="material-value">
                            <span>
                                Customized logo and <br /> design custom packages 
                            </span>
                        </div>
                    </div>
                    <div className="item-detail-materials">
                        <div className="material-key">
                            <span>
                                Protection: 
                            </span>
                        </div>
                        <div className="material-value">
                            <span>
                                Refund Policy 
                            </span>
                        </div>
                    </div>
                    <div className="item-detail-materials border">
                        <div className="material-key">
                            <span>
                                Warranty:
                            </span>
                        </div>
                        <div className="material-value">
                            <span>
                                2 years full warranty
                            </span>
                        </div>
                    </div>
                </div>

                <div className="supplier-container">
                    <div className="supplier-context">
                        <div className="supplier-title">
                            <div className="supplier-logo">
                                <span>R</span>
                            </div>
                            <div>
                                <span>
                                    Supplier <br /> Guanjoi Trading LLC
                                </span>
                            </div>
                        </div>
                        <div className="supplier-shipping">
                            <div className="supplier-image">
                                <img src="/flags/Germany.png" alt="" />
                            </div>
                            <div>
                                <span>
                                    Germany, Berlin
                                </span>
                            </div>
                        </div>
                        <div className="supplier-shipping">
                            <div className="supplier-image">
                                <img src={tick} alt="" />
                            </div>
                            <div>
                                <span>
                                    Verified Seller
                                </span>
                            </div>
                        </div>
                        <div className="supplier-shipping">
                            <div className="supplier-image">
                                <img src={language} alt="" />
                            </div>
                            <div>
                                <span>
                                    Worldwide shipping
                                </span>
                            </div>
                        </div>
                        <div className="supplier-inquiry-button">
                            {!error ? (
                                <>
                                {isInCart ? (
                                <button style={{
                                    opacity:"0.5"
                                }}>
                                    Already in cart
                                </button>
                                ) : (
                                <button onClick={() => {
                                    if(!userToken){
                                        setCartAccessToggle("restrict")
                                        return
                                    }
                                    addToCart()
                                    }}>
                                    Move to Cart
                                </button>
                                )}
                                </>
                            ) : (
                                <button onClick={() => {}}>
                                    Something wrong
                                </button>
                            )}
                        </div>
                        <div className="supplier-profile-button">
                            <button>
                                Seller's profile
                            </button>
                        </div>
                    </div>
                    <div className="save-later">
                        <div>
                            <img src={heartIcon} alt="" />
                        </div>
                        <div>
                            <span>
                                Save for later
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            </React.Fragment>
            ) : (
                !suggestionsError ? (
                    <h1 className="item-loader">
                    Loading data . . .
                    </h1>
                ) : (
                    null
                )
            )}
        </section>

        <section className="item-description-section">
            <div className="item-description-section-container">
                <div className="item-description-container">
                {suggestionsData && suggestionsData.id ? (
                <React.Fragment>
                    <div className="item-description-categories">
                        <ul>
                            <li className="active">
                            <span>
                                Description
                            </span>
                            </li>
                            <li>
                                <span>
                                Reviews
                                </span>
                            </li>
                            <li>
                                <span>
                                Shipping
                                </span>
                            </li>
                            <li>
                                <span>
                                About company
                                </span>
                            </li>
                        </ul>
                    </div>

                    <div className="item-description-text">
                        {suggestionsData && suggestionsData.id ? (
                        <span>
                            {suggestionsData.description}
                        </span>
                        ): null}
                    </div>

                    <div className="item-description-model-categories">
                        <ul>
                            <li>
                                <div className="model-categories-key">
                                    <span>
                                        Model
                                    </span>
                                </div>
                                <div className="model-categories-value">
                                    <span>
                                        #8786867
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div className="model-categories-key">
                                    <span>
                                        Style
                                    </span>
                                </div>
                                <div className="model-categories-value">
                                    <span>
                                        Classic style
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div className="model-categories-key">
                                    <span>
                                        Certificate
                                    </span>
                                </div>
                                <div className="model-categories-value">
                                    <span>
                                        ISO-898921212
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div className="model-categories-key">
                                    <span>
                                        Size
                                    </span>
                                </div>
                                <div className="model-categories-value">
                                    <span>
                                        34mm x 450mm x 19mm
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div className="model-categories-key">
                                    <span>
                                    Memory
                                    </span>
                                </div>
                                <div className="model-categories-value">
                                    <span>
                                        36GB RAM
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="item-description-features">
                        <div className="description-single-feature">
                            <span>
                            ✓ 
                            </span>
                            <span>
                            Some great feature name here
                            </span>
                        </div>
                        <div className="description-single-feature">
                            <span>
                            ✓ 
                            </span>
                            <span>
                            Lorem ipsum dolor sit amet, consectetur 
                            </span>
                        </div>
                        <div className="description-single-feature">
                            <span>
                            ✓ 
                            </span>
                            <span>
                            Duis aute irure dolor in reprehenderit
                            </span>
                        </div>
                        <div className="description-single-feature">
                            <span>
                            ✓ 
                            </span>
                            <span>
                            Some great feature name here
                            </span>
                        </div>
                    </div>
                    </React.Fragment>
                    ) : (
                        !suggestionsError ? (
                            (null)
                        ) : (
                            <h1 className='error'>
                                Item could not found...
                            </h1>
                        )
                    )}
                </div>

                <div className="may-like">

                    {recommendedData && recommendedData.length ? (
                        <React.Fragment>
                            <div className="may-like-text">
                                <h6 style={{marginBottom:"10px"}}>
                                    You may like
                                </h6>
                            </div>
        
                            {recommendedData.map((item) => {
                                return(
                                    <React.Fragment key={item.id}>
                                        <YouMayLike
                                        image={item.images}
                                        name={item.name}
                                        price={item.price}
                                        id={item.id}
                                        />
                                    </React.Fragment>
                                )
                            })}
                        </React.Fragment>
                    ) : (
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
            </div>
        </section>

        <section className="responsive-supplier-section">
            <div className="supplier-container responsive-supplier-container">
                <div className="supplier-context">
                    <div className="supplier-title">
                        <div className="supplier-logo">
                            <span>R</span>
                        </div>
                        <div>
                            <span>
                                Supplier <br /> Guanjoi Trading LLC
                            </span>
                        </div>
                    </div>
                    <div className="supplier-shipping-container">
                        <div className="supplier-shipping">
                            <div className="supplier-image">
                                <img src="/flags/Germany.png" alt="" />
                            </div>
                            <div className="supplier-shipping-span">
                                <span>
                                    Germany, Berlin
                                </span>
                            </div>
                            <div className="responsive-supplier-shipping-span">
                                <span>
                                    Germany
                                </span>
                            </div>
                        </div>
                        <div className="supplier-shipping">
                            <div className="supplier-image">
                                <img src={tick} alt="" />
                            </div>
                            <div className="supplier-shipping-span">
                                <span>
                                    Verified Seller
                                </span>
                            </div>
                            <div className="responsive-supplier-shipping-span">
                                <span>
                                    Verified
                                </span>
                            </div>
                        </div>
                        <div className="supplier-shipping">
                            <div className="supplier-image">
                                <img src={language} alt="" />
                            </div>
                            <div className="supplier-shipping-span">
                                <span>
                                    Worldwide shipping
                                </span>
                            </div>
                            <div className="responsive-supplier-shipping-span">
                                <span>
                                    Shipping
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className='recommended-section item-recommended'>
            <div className='recommended-section-container'>
                <div className='recommended-section-text'>
                    <h3>
                        Similar products
                    </h3>
                </div>
                {recommendedData && recommendedData.length ? (

                <div className='recommended-items'>
                    <ul>
                        {recommendedData.map((item) => {
                            return(
                                <li key={item.id}>
                                    <Recommeded
                                    image = {item.images}
                                    price={item.price}
                                    name={item.name}
                                    id={item.id}
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
        </>
    )
}

export default Item
