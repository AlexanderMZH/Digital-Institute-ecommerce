import { useLocation } from "react-router-dom"

import "./style.scss"

const FooterDiscount = () =>{
    const {pathname} = useLocation()

    if(pathname === "/" || pathname.includes('/list-item')){
        return
    }
    
    return(
        <div className={`footer-discount ${pathname.includes("cart") ? ("main-bg"): ("item-bg")}`}>
            <div className="footer-discount-container">

                <div className="footer-discount-svg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="745" height="120" viewBox="0 0 745 120" fill="none">
                        <path d="M0 6C0 2.68629 2.68629 0 6 0H700.47L745 120H6.00002C2.68631 120 0 117.314 0 114V6Z" fill="#237CFF"/>
                    </svg>
                </div>

                <div className="footer-discount-elements">
                    <div>
                        <h3>
                            Super discount on more than 100 USD
                        </h3>
                        <span>
                            Have you ever finally just write dummy info
                        </span>
                    </div>
                    <div>
                        <button>
                            Shop now
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )

}

export default FooterDiscount