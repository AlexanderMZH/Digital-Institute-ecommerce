import React from 'react'
import { useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Categories from '../../Components/Categories/Categoreis'
import Timer from '../../Components/Timer/Timer'
import Offers from '../../Components/Offers/Offers'
import Suggestions from '../../Components/Suggestions/Suggestions'
import Recommended from '../../Components/Recommended/Recommended'
import ExtraServices from '../../Components/ExtraServices/ExtraServices'
import Region from '../../Components/Region/Region'

import { getCategories } from "../../store/CategoriesSlice/CategoriesSlice"
import { getOffers } from '../../store/OffersSlice/OffersSlice'
import { getSuggestions } from '../../store/SuggestionsSlice/SuggestionsSlice'
import { getRecommendedData } from '../../store/RecommendedSlice/RecommendedSlice'
import { getCartData } from '../../store/CartSlice/CartSlice'
import { extra_services } from '../../static/extra_services'
import { region } from '../../static/region'

import mainImage from "../../assets/images/main.png"
import arrow_forward from "../../assets/images/arrow_forward.png"
import avatar from "../../assets/images/Avatar.png"
import image from "../../assets/images/image.png"
import image1 from "../../assets/images/image1.png"

import "./style.scss"

const Main = () => {
    const [logOutToggle, setLogOutToggle] = useState("in")

    const {categories,categoriesError} = useSelector(state => state.categories)
    const {offersData,offersError} = useSelector(state => state.offers)
    const {suggestionsData,suggestionsError} = useSelector(state => state.suggestions)
    const {recommendedData,recommendedError} = useSelector(state => state.recommended)

    const userToken = JSON.parse(localStorage.getItem('userToken'))

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getCategories())
        dispatch(getOffers())
        dispatch(getSuggestions())
        dispatch(getRecommendedData())
    },[dispatch])

    useEffect(() => {
        if(userToken){
            dispatch(getCartData())
        }
    },[logOutToggle])

    const logOut = () => {
        localStorage.removeItem("userToken")
        setLogOutToggle("in")
    }
    
    return(
        <>
        <section className='responsive-category-section'>
            <div>
                <ul>
                    {categories && categories.length ? (
                    <ul>
                        {categories.map((item) => {
                            return(
                                <li key={item.id}>
                                    <Categories
                                    categoryName={item.name}
                                    categoryID={item.id}
                                    />
                                </li>
                            )
                        })}
                    </ul>
                    ) : (
                        !categoriesError ? (
                            <h1 className='loading'>
                            Loading data...
                            </h1>
                        ) : (
                            <h1 className='error'>
                                Categories could not Load...
                            </h1>
                        )
                        )
                    }
                </ul>
            </div>
        </section>
        <section className="category-section">
            <div className="category-container">
                <div className="category-list">
                    {categories && categories.length ? (
                    <ul>
                        {categories.map((item) => {
                            return(
                                <li key={item.id}>
                                    <Categories
                                    categoryName={item.name}
                                    categoryID={item.id}
                                    />
                                </li>
                            )
                        })}
                    </ul>
                    ) : (
                        !categoriesError ? (
                            <h1 className='loading'>
                            Loading data...
                            </h1>
                        ) : (
                            <h1 className='error'>
                                Something went wrong...
                            </h1>
                        )
                        )
                    }
                </div>
                
                <div className="category-info">
                    <div className="caterogy-main-item">
                        <div className='main-image'>
                            <img src={mainImage} alt="" />
                        </div>
                        <div className='latest-trending'>
                            <span>latest trending</span>
                            <h2>electronic items</h2>
                            <button>learn more</button>
                        </div>
                    </div>
                    <div className="category-offers">
                        {userToken ? (
                            <>
                            <div className="category-user user">
                                <div className="category-user-content">
                                    <img src= {avatar} alt="" />
                                    <span>Hi,user</span>
                                </div>
                                <div className="category-user-buttons">
                                    <button onClick={() => {setLogOutToggle("out")}}>Log out</button>
                                </div>
                            </div>
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
                        ) : (
                        <div className="category-user">
                            <div className="category-user-content">
                                <img src={avatar} alt="" />
                                <span>Hi,user <br /> let's get started</span>
                            </div>
                            <div className="category-user-buttons">
                                <button onClick={() => {
                                    navigate("registration")
                                    setLogOutToggle("in")
                                    }}>
                                        join now
                                </button>
                                <button onClick={() => {
                                    navigate("/login")
                                    setLogOutToggle("in")
                                    }}>
                                    log in
                                </button>
                            </div>
                        </div>
                        )}

                        <div className="category-orange">
                            <span>Get US $10 off <br /> with a new <br /> supplier</span>
                        </div>
                        <div className="category-purple">
                            <span>Send quotes with <br /> supplier <br /> preferences</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className='offers-section'>
            <div className='offers-container'>
                <div className='deals-time'>
                    <Timer/>
                </div>
                {offersData && offersData.length ? (
                <div className='deals-items-container'>
                    <ul>
                        {offersData.map((item) => {
                            return(
                                <li key={item.id}>
                                    <Offers
                                    offers_image = {item.image}
                                    offers_name = {item.name}
                                    offers_oldPrice = {item.oldPrice}
                                    offers_newPrice ={item.newPrice}
                                    />
                                </li>
                            )
                        })}
                    </ul>
                </div>
                ): (
                    !offersError ? (
                        <h1 className='loading'>
                        Loading data...
                        </h1>
                    ) : (
                        <h1 className='error'>
                            Something went wrong...
                        </h1>
                    )
                )
                }

            </div>
        </section>

        <section className='responsive-suggestion-section'>
            <div>
                <h1>
                    Smart Home
                </h1>
            </div>
        </section>

        <section className='suggestion-section'>
            <div className='suggestion-container'>
                <div className='suggestion-image'>
                    <img src={image} alt="" />
                    <div className='suggestion-image-text'>
                        <h1>Home and outdoor</h1>
                        <button>Source now</button>
                    </div>
                </div>
                {suggestionsData && suggestionsData.length ? (
                    <div className='suggestion-items'>
                        <ul>
                            {suggestionsData.slice(0,6).map(item => {
                                return (
                                    <li key={item.id}>
                                        <Suggestions
                                        id={item.id}
                                        suggestions_name={item.name}
                                        suggestions_price={item.price}
                                        suggestions_image = {item.images}
                                        />
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                ):(
                    !suggestionsError ? (
                        <h1 className='loading'>
                        Loading data...
                        </h1>
                    ) : (
                        <h1 className='error'>
                            Something went wrong...
                        </h1>
                    )
                ) 
                }
            </div>
            
            <div className='suggestion-container suggestion-container-second'>
                <div className='suggestion-image'>
                    <img src={image1} alt="" />
                    <div className='suggestion-image-text'>
                        <h1>Consumer electronics and gadgets</h1>
                        <button>Source now</button>
                    </div>
                </div>
                {suggestionsData && suggestionsData.length ? (
                    <div className='suggestion-items'>
                        <ul>
                            {suggestionsData.slice(0,6).map(item => {
                                return (
                                    <li key={item.id}>
                                        <Suggestions
                                        id={item.id}
                                        suggestions_name={item.name}
                                        suggestions_price={item.price}
                                        suggestions_image = {item.images}
                                        />
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                ): (
                    !suggestionsError ? (
                        <h1 className='loading'>
                        Loading data...
                        </h1>
                    ) : (
                        <h1 className='error'>
                            Something went wrong...
                        </h1>
                    )
                )
                }
            </div>
        </section>

        <section className='responsive-source-now'>
            <div>
                <h1>
                    Source now
                </h1>
                <img src={arrow_forward} alt="" />
            </div>
        </section>
        
        <section className='supplier-section'>
            <div className='supplier-bg'>
                <div className='supplier-text'>
                    <h2>
                        An easy way to send <br /> requests to all suppliers
                    </h2>
                    <span>
                        Lorem ipsum dolor sit amet, consectetur adipisicing <br /> elit, sed do eiusmod tempor incididunt.
                    </span>
                    <div className='responsive-supplier-button'>
                        <button>
                            Send inquiry
                        </button>
                    </div>
                </div>

                <div className='supplier-quotesend'>
                    <div>
                        <h3>
                            Send quote to suppliers 
                        </h3>
                    </div>
                    <div>
                        <span>
                            What item you need?
                        </span>
                    </div>
                    <div>
                        <input type="text" placeholder='Type more details'/>
                    </div>
                    <div>
                        <span>Quantity</span>
                        <select>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                    </div>
                    <div>
                        <button>
                            Send inquiry
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <section className='recommended-section'>
            <div className='recommended-section-container'>
                <div className='recommended-section-text'>
                    <h3>
                        Recommended items
                    </h3>
                </div>
                {recommendedData && recommendedData.length ? (

                <div className='recommended-items'>
                    <ul>
                        {recommendedData.map((item) => {
                            return(
                                <li key={item.id}>
                                    <Recommended
                                    image = {item.images}
                                    price={item.price}
                                    name={item.name}
                                    id={item.id}
                                    />
                                </li>
                            )
                        })}
                    </ul>
                    <ul className='recommended-items-second'>
                        {recommendedData.map((item) => {
                            return(
                                <li key={item.id}>
                                    <Recommended
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

        <section className='extra-services-section'>
            <div className='extra-services-container'>
                <div className='extra-services-text'>
                    <h3>
                        Our extra services
                    </h3>
                </div>
                <div className='extra-item'>
                    <ul>
                        {extra_services.map((item) => {
                            return(
                                <li key={item.id}>
                                    <ExtraServices
                                    image={item.image}
                                    icon={item.icon}
                                    name={item.name}
                                    />
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </section>

        <section className='region-section'>
            <div className='region-container'>
                <div className='region-title'>
                    <h3>Suppliers by region</h3>
                </div>
                <div className='region-suppliers'>
                    <ul>
                        {region.map(item => (
                            <li key={item.flag}>
                                <Region
                                flag={item.flag}
                                domain={item.domain}
                                />
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </section>
        </>
    )
}

export default React.memo(Main)