
const AuthInput = ({id,inputValue,changeInputValue, label, placeholder, invisible, visible, inputType,visibilityToggle,autoComplete}) => {

    return(
        <div className="auth-input">
            <label htmlFor={id} >{label}</label>
            <input type={inputType} autoComplete={autoComplete} id={id} placeholder={placeholder} value={inputValue} onChange={(e) => {changeInputValue(e.target.value)}}/>
            <img src={invisible} alt="" onClick={() => {visibilityToggle(label)}} className={`pass-${inputType}`}/>
            <img src={visible} alt="" onClick={() => {visibilityToggle(label)}} className={`text-${inputType}`}/>
        </div> 
    )
}

export default AuthInput