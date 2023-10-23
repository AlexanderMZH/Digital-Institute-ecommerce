import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

import { getSearchCategoryId } from "../../store/CategoriesSlice/CategoriesSlice"

const Categories = ({categoryName, categoryID}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const path = useLocation()
    
    const categoryClick = () => {
        if(path.pathname.includes("list-item")){
            dispatch(getSearchCategoryId(categoryID))
        }else{
            navigate("list-item")
            dispatch(getSearchCategoryId(categoryID))
        }
    }
    
    return (
        <>
        <div className="single-category" onClick={() => {categoryClick()}}>
            <span>
                {categoryName}
            </span>
        </div>
        </>
    ) 
}

export default Categories