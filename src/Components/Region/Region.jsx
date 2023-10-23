
import "./style.scss"

const Region = ({flag,domain}) => {
    return(
        <div className="region-suppliers-container">
            <div className="region-image">
                <img src={`/flags/${flag}.png`} alt="flag" />
            </div>
            <div className="region-domain">
                <h6>{flag}</h6>
                <span>{domain}</span>
            </div>

        </div>
    )
}

export default Region