import "./style.scss"

const ExtraServices =({image,icon,name}) => {

    return(
        <div className='extra-item-container'>
            <div className='extra-item-image-container'>
                <div className='extra-item-image'>
                    <img src={image} alt="" />
                </div>
                <div className="extra-item-icon-container">
                    <img src={icon} alt="icon" className="extra-item-icon"/>
                </div>
            </div>
            <div className='extra-item-text'> 
                <span>
                    {name}
                </span>
            </div>
        </div>
    )
}

export default ExtraServices