import { useNavigate } from "react-router-dom"

import "./style.scss"

const CartProduct = ({image, name, price, id, removeFromCart}) => {

    const navigate = useNavigate()

    return(
        <>
        <div className="cart-item">
            <div className="cart-item-image" onClick={() => {navigate(`/item/${id}`)}}>
                <img src={image} alt="product" />
            </div>
            <div className="cart-item-details">
                <div className="cart-item-name" onClick={() => {navigate(`/item/${id}`)}}>
                    <span>
                        {name}
                    </span>
                </div>
                <div className="cart-item-description" onClick={() => {navigate(`/item/${id}`)}}>
                    <span>
                        Size: medium, Color: blue,  Material: Plastic Seller: Artel Market
                    </span>
                </div>
                <div className="cart-item-buttons">
                    <div className="remove">
                        <button onClick={() => {
                            removeFromCart(id)
                        }}>
                            Remove
                        </button>
                    </div>
                    <div className="save">
                        <button>
                            Save for later
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div className="cart-item-price-container">
            <div className="cart-item-price">
                <span>
                    {price}
                </span>
            </div>
            <div className="cart-item-qty">
            <select name="" id="">
                <option value="">
                    Qty:1
                </option>
                <option value="">
                    Qty:2
                </option>
                <option value="">
                    Qty:3
                </option>
            </select>
            </div>
        </div>
    </>
    )
}

export default CartProduct