import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import AuthInput from "../../Components/AuthInput/AuthInput"

import { validation } from "../../static/validation"

import logo from "../../assets/images/logo.png"
import auth_bg from "../../assets/images/auth-bg.png" 
import invisibleIcon from "../../assets/images/invisible.png" 
import visibleIcon from "../../assets/images/visible.png" 

import "./style.scss"

const Authentication = () =>{
    const [loader, setLoader] = useState(false)
    const [passwordVisibility,setPasswordVisibility] = useState("password")
    const [confirmPasswordVisibility,setConfirmPasswordVisibility] = useState("password")

    const [email, setEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [authValidation, setAuthValidation] = useState("")

    const navigate = useNavigate()
    const userToken = JSON.parse(localStorage.getItem('userToken'))

    useEffect(() => {
        if(userToken){
            navigate("/")
            return
        }
    },[])
    
    const visibilityToggle = (label) => {
        if(label === "Password"){
            setPasswordVisibility((preState) => preState === "password" ? "text" : "password")
        }

        if(label === "Confirm password"){
            setConfirmPasswordVisibility((preState) => preState === "password" ? "text" : "password")
        }
    }

    const FetchRegister = async () => {

        if(
            email.trim() === '' ||
            password === '' ||
            confirmPassword === "" ||
            userName.trim() === ""
            ){
                setAuthValidation("you need to fill all of the fields")
                return
            }

        if(!email.match(validation.emailValidation)){
            setAuthValidation("incorrect email")
            return
        }
        if(!password.match(validation.uppercaseLetters)){
            setAuthValidation("password should include at list one uppercase letter")
            return
        }
        if(!password.match(validation.specialChars)){
            setAuthValidation("password should include at list one special character")
            return
        }
        if(!password.match(validation.number)){
            setAuthValidation("password should include at list one number")
            return
        }
        if(password.length < 8){
            setAuthValidation("password should contain at list 8 character")
            return
        }
        
        if(password !== confirmPassword){
            setAuthValidation("invalid password confirmation")
            return
        }
            
        try {
            setLoader(true)
            setAuthValidation("")
            const res = await fetch('https://amazon-digital-prod.azurewebsites.net/api/user/registerUser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                userName:userName,
                email: email,
                password: password
                })
            })
            navigate('/')

            setEmail("")
            setUserName("")
            setPassword("")
            setConfirmPassword("")
            setLoader(false)
        }
        catch (error) {
            setAuthValidation("something went wrong,please try later")
            setEmail("")
            setUserName("")
            setPassword("")
            setConfirmPassword("")
            setLoader(false)
        }
  }

    return(
        <main className="auth">
            {loader ? (
                <div className="auth-loader">
                    <h1>
                        Signing up...
                    </h1>
                </div>
            ) : null}
            <div className="auth-logo">
                <img src={logo} alt="" onClick={() => {navigate("/")}}/>
            </div>
            <div className="auth-container">
                <div className="signup">
                    <div className="singup-container">
                        <div className="welcome">
                            <span>
                                Welcome!
                            </span>
                        </div>
                        <div className="singup-text">
                            <span>
                                Sign up
                            </span>
                        </div>
                        <form>
                            <AuthInput
                            id={"email"}
                            label={"email"}
                            placeholder={"Enter your email"}
                            autoComplete={"email"}
                            inputValue={email}
                            changeInputValue={setEmail}
                            />
                            <AuthInput
                            id={"name"}
                            label={"User name"}
                            placeholder={"Enter your user name"}
                            autoComplete={"username"}
                            inputValue={userName}
                            changeInputValue={setUserName}
                            />
                            <AuthInput
                            id={"password"}
                            label={"Password"}
                            placeholder={"Enter your password"}
                            autoComplete={"new-password"}
                            visible={invisibleIcon}
                            invisible={visibleIcon}
                            inputType={passwordVisibility}
                            visibilityToggle={visibilityToggle}
                            inputValue={password}
                            changeInputValue={setPassword}
                            />
                            <AuthInput
                            id={"confirm-password"}
                            label={"Confirm password"}
                            placeholder={"Confirm your password"}
                            autoComplete={"new-password"}
                            visible={invisibleIcon}
                            invisible={visibleIcon}
                            inputType={confirmPasswordVisibility}
                            visibilityToggle={visibilityToggle}
                            inputValue={confirmPassword}
                            changeInputValue={setConfirmPassword}
                            />
                            <div className="auth-nav">
                                <div className="validation">
                                    <span>
                                        {authValidation}
                                    </span>
                                </div>
                                
                                <div className="auth-button">
                                    <button onClick={(e) => {
                                        FetchRegister()
                                        e.preventDefault()
                                    }}>
                                        Register
                                    </button>
                                </div>
                                <div className="have-already">
                                    <div>
                                        <span>
                                            Already have an account
                                        </span>
                                    </div>
                                    <div className="register" onClick={() => {navigate("/login")}}>
                                        <span>
                                            Sign in
                                        </span>
                                    </div>
                                </div>             
                            </div>
                        </form>
                    </div>
                </div>

                <div className="auth-picture">
                    <img src= {auth_bg} alt="" />
                </div>
            </div>
        </main>
    )
}

export default Authentication