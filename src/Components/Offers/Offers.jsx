
import "./style.scss"

const Offers =({offers_image,offers_name,offers_oldPrice,offers_newPrice}) => {

    return(
        <div className='deals-item'>
            <div className="deals-image">
                <img src={offers_image} alt="product" />
            </div>
            <div className="deals-item-name">
                <span>
                    {offers_name}
                </span>
            </div>
            <div className="deals-percentage">
            <span>-{Math.floor(((offers_oldPrice - offers_newPrice)/offers_oldPrice)*100)}%</span>
            </div>
        </div>
    )
}

export default Offers