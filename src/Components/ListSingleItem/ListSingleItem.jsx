import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { getCartCheck } from "../../store/CartCheck/CartCheck"

import heartIcon from "../../assets/images/heart.png"
import stars from "../../assets/images/stars.png"

import "./style.scss"

const ListSingleItem = ({nameTogle, image, name, description, price, addToCart, id}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return(
        <>
        <div className="single-item-container">
            <div className="add-cart" onClick={() => {
                addToCart(id)
                dispatch(getCartCheck(id))
            }}>
                <img src={heartIcon} alt="" />
            </div>

            <div className="single-item"
            onClick={() => {navigate(`/item/${id}`)}}
            >
                
                <div className="item-image">
                    <img src={image} alt="product" />
                </div>

                <div className="item-description-container">

                    <div className="item-name">
                        <span>
                            {name}
                        </span>
                    </div>

                    <div className="item-price">
                        <div className="new-price">
                            <span>
                                ${price}
                            </span>
                        </div>
                        <div className="old-price">
                            $1128.00
                        </div>
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
                                <div>
                                    <span>
                                        154 orders
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div className="shipping">
                                    <span>Free shipping</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="item-description">
                        {nameTogle === "gridview" ? (
                            <span className="gridview-name">
                                {name}
                            </span>
                        ) : (
                            <span>
                                {description}
                            </span>
                        )}
                    </div>

                    <div className="view-details">
                        <span>
                            view details
                        </span>
                    </div>
                </div>
            </div>
        </div>
        
        </>
    )
}

export default ListSingleItem