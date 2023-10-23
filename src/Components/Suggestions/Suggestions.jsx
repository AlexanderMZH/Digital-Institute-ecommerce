import { useNavigate } from "react-router-dom"

import "./style.scss"

const Suggestions = ({suggestions_name,suggestions_price,suggestions_image,id}) =>{
    const navigate = useNavigate()
        
    return(
        <>
        <div className="suggestion-item-container" onClick={() => {
                navigate(`/item/${id}`)
            }}>
            <div className='suggestion-item-description'>
                <div>
                    <span>
                        {suggestions_name}
                    </span>
                </div>
                <div className="suggestion-item-price">
                    <div>
                        <span>
                            from
                        </span>
                    </div>
                    <div>
                        <span>
                            USD {suggestions_price}
                        </span>
                    </div>
                </div>
            </div>
            <div className="suggestion-item-image">
                <img src={suggestions_image} alt="product" />
            </div>
        </div>
    </>
    )
}

export default Suggestions