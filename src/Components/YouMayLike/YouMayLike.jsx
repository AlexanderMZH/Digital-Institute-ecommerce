import { useNavigate } from "react-router-dom"

import "./style.scss"

const YouMayLike = ({image,name,price,id}) => {

    const navigate = useNavigate()
    
    return(
        <div className="may-like-item" onClick={() => {
            navigate(`/item/${id}`)
        }}>
            <div className="may-like-image">
                <img src={image} alt="" />
            </div>
            <div className="may-like-details">
                <div className="may-like-name">
                    <h6>
                        {name}
                    </h6>
                </div>
                <div className="may-like-price">
                    <span>
                        {price}$
                    </span>
                </div>
            </div>
        </div>
    )
}

export default YouMayLike