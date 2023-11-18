import { useEffect } from "react"
import "./style.scss"
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/')
          }, 2500);
          return () => clearTimeout(timer);
    },[navigate])
    
    return <h1 id="not-found">Page not Found...Redirecting to home page</h1>
}

export default NotFound