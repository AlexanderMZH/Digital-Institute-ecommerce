import { useNavigate,useLocation } from "react-router-dom"

import FooterSubscribe from "../FooterSubscribe/FooterSubscribe"
import FooterDiscount from "../FooterDiscount/FooterDiscount"

import { footer } from "../../static/footer"


import logo from "../../assets/images/logo.png"
import facebook from "../../assets/images/socials/facebook.png"
import instagram from "../../assets/images/socials/instagram.png"
import linkedin from "../../assets/images/socials/linkedin.png"
import twitter from "../../assets/images/socials/twitter.png"
import youtube from "../../assets/images/socials/youtube.png"
import app_store from "../../assets/images/apps/app_store.png"
import google_play from "../../assets/images/apps/google_play.png"

import "./style.scss"
const Footer = () => {
    const navigate = useNavigate()
    const {pathname} = useLocation()

    if(pathname === "/login" || pathname === "/registration"){
        return
    }

    return(
        <>
        <FooterSubscribe/>
        <FooterDiscount />
        <footer>
            <section className="footer-section">
                <div className="footer-section-container">
                    <div className="footer-brand">
                        <div className="footer-brand-image" 
                        onClick={() => {
                            navigate("/")
                        }}>
                            <img src={logo} alt="" />
                        </div>
                        <div className="footer-brand-text">
                            <span>
                                Best information about the company
                            </span>
                        </div>
                        <div className="footer-socials">
                            <img src={facebook} alt="facebook" />
                            <img src={twitter} alt="twitter" />
                            <img src={linkedin} alt="linkedin" />
                            <img src={instagram} alt="instagram" />
                            <img src={youtube} alt="youtube" />
                        </div>
                    </div>
                    <div className="footer-context">
                        <ul>
                            {footer.map(item => {
                            return(
                                <li key={item.name}>
                                    <div className="footer-context-container">
                                        <div className="footer-context-name">
                                            <h6>
                                                {item.name}
                                            </h6>
                                        </div>
                                        {item.context.map((item) => {
                                            return(
                                                <div key={item}>
                                                    <span>
                                                        {item}
                                                    </span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="footer-app">
                    <div className="footer-app-text">
                        <h6>Get app</h6>
                    </div>
                    <div className="footer-app-icons">
                        <div>
                            <img src={app_store} alt="app sotre" />
                        </div>
                        <div>
                            <img src={google_play} alt="google play" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-context responsive-footer-context">
                <ul>
                    {footer.map(item => {
                        return(
                        <li key={item.name}>
                            <div className="footer-context-container">
                                <div className="footer-context-name">
                                    <h6>
                                        {item.name}
                                    </h6>
                                </div>
                                {item.context.map((item) => {
                                    return(
                                        <div key={item}>
                                            <span>
                                                {item}
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                        </li>
                    )
                    })}
                </ul>
            </div>
            </section>
            <section className="ecommerce">
                <div className="ecommers-container">
                    <div>
                        <span>© 2023 Ecommerce.</span>
                    </div>
                    <select>
                        <option>English</option>
                        <option>English</option>
                        <option>English</option>
                    </select>
                </div>
            </section>
        </footer>

        </>
    )
}

export default Footer