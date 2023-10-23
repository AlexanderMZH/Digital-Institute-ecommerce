import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import AuthInput from "../../Components/AuthInput/AuthInput"

import { validation } from "../../static/validation"

import logo from "../../assets/images/logo.png"
import auth_bg from "../../assets/images/auth-bg.png"
import visibleIcon from "../../assets/images/visible.png"
import invisibleIcon from "../../assets/images/invisible.png"

import "./style.scss"

const Login = () =>{
    const [loader, setLoader] = useState(false)
    const [passwordVisibility,setPasswordVisibility] = useState("password")

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [authValidation, setAuthValidation] = useState("")

    const navigate = useNavigate()
    const userToken = JSON.parse(localStorage.getItem('userToken'))

    useEffect(() => {
        if(userToken){
            navigate("/")
            return
        }
    },[])

    const visibilityToggle = () => {
        setPasswordVisibility((preState) => preState === "password" ? "text" : "password")
    }

    const fetchLogin = async () => {
        
        // if(
        //     email.trim() === '' ||
        //     password === ''        ){
        //         setAuthValidation("you need to fill all of the fields!")
        //         return
        //     }

        // if(!password.match(validation.uppercaseLetters)){
        //     setAuthValidation("password should include at list one uppercase letter!")
        //     return
        // }
        // if(!password.match(validation.specialChars)){
        //     setAuthValidation("password should include at list one special character!")
        //     return
        // }
        // if(!password.match(validation.number)){
        //     setAuthValidation("password should include at list one number!")
        //     return
        // }
        // if(password.length < 8){
        //     setAuthValidation("password should contain at list 8 character!")
        //     return
        // }
            
        try {
            setLoader(true)
            setAuthValidation("")
            const res = await fetch('https://amazon-digital-prod.azurewebsites.net/api/User/LogIn', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            const data = await res.json()

            localStorage.setItem("userToken", JSON.stringify(data.jwt))
            
            navigate('/')

            setPassword("")
            setEmail('')
            setLoader(false)
        }
        catch (error) {
            setAuthValidation("something went wrong,please try later")
            setPassword("")
            setEmail('')
            setLoader(false)
        }
  }
    
    return(
        <main className="auth">
            {loader ? (
                <div className="auth-loader">
                    <h1>
                        Loggin in...
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
                                Sign in
                            </span>
                        </div>
                        <form>
                            <AuthInput
                            id={"name"}
                            label={"Email"}
                            placeholder={"Enter your email"}
                            autoComplete={"email"}
                            inputValue={email}
                            changeInputValue={setEmail}
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

                            <div className="remember-me">
                                <div>
                                    <input type="checkbox" id="remember" />
                                    <label htmlFor="remember">Remember me</label>
                                </div>
                                <div>
                                    <span>
                                        Forgot Password?
                                    </span>
                                </div>
                            </div>
                            
                            <div className="auth-nav">
                                <div className="validation">
                                    <span>
                                        {authValidation}
                                    </span>
                                </div>
                                <div className="auth-button">
                                    <button onClick={(e) => {
                                        e.preventDefault()
                                        fetchLogin()
                                    }}>
                                        Login
                                    </button>
                                </div>
                                <div className="have-already">
                                    <div>
                                        <span>
                                            Don't you have an Account? 
                                        </span>
                                    </div>
                                    <div className="register" onClick={() => {navigate("/registration")}}>
                                        <span>
                                            Register
                                        </span>
                                    </div>
                                </div>            
                            </div>
                        </form>
                    </div>
                </div>

                <div className="auth-picture">
                    <img src={auth_bg} alt="" />
                </div>
            </div>
        </main>
    )
}

export default Login