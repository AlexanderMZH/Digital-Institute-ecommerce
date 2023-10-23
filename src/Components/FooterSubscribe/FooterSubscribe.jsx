import { useLocation } from "react-router-dom"

import email from "../../assets/images/email.png"

import "./style.scss"

const FooterSubscribe = () => {
    const {pathname} = useLocation()

    if(pathname.includes("/item") || pathname.includes("/cart")){
        return
    }

    return(
        <section className="newsletter-section">
            <div className="newsletter-section-container">
                <div>
                    <h4>
                        Subscribe on our newsletter
                    </h4>
                </div>
                <div className="newsletter-section-span">
                    <span>
                        Get daily news on upcoming offers from many suppliers all over the world
                    </span>
                </div>
                <div className="newsletter-input-container">
                    <div className="newsletter-input">
                        <input type="text" placeholder="Email" />
                        <img src={email} alt="email icon" />
                    </div>
                    <button>Subscribe</button>
                </div>
            </div>
        </section>
    )
}

export default FooterSubscribe