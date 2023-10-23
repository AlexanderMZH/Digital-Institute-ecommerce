import { React, useEffect, useState , useRef} from "react"
import { useDispatch,useSelector } from "react-redux"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"

import { getCategories } from "../../store/CategoriesSlice/CategoriesSlice"
import { getCartData } from "../../store/CartSlice/CartSlice"

import Categories from "../../Components/Categories/Categoreis"
import ListSingleItem from "../../Components/ListSingleItem/ListSingleItem"

import rating2 from "../../assets/images/stars/rating2.png"
import rating3 from "../../assets/images/stars/rating3.png"
import rating4 from "../../assets/images/stars/rating4.png"
import rating5 from "../../assets/images/stars/rating5.png"
import chevronRight from "../../assets/images/chevron_right.png"
import chevron_up from "../../assets/images/chevron_up.png"
import filter_icon from "../../assets/images/filter.png"
import gridviewIcon from "../../assets/images/gridview.png"
import listview from "../../assets/images/listview.png"
import sort from "../../assets/images/sort.png"

import "./style.scss"

const ListItems = () => {      
    const {categories,categoriesError,categoryId} = useSelector(state => state.categories)
    const {cartData} = useSelector(state => state.cart)

    const [searchPramas, setSeachrParams] = useSearchParams()
    const {search} = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [categoryPath, setCategoryPath] = useState([])
    const [categoryItems, setCategoryItems] = useState([])
    const [categoryItemBrand,setCategoryItemBrand] = useState([])
    const [filteredBrand, setFilteredBrand] = useState([])
    
    const [categoryToglle,setCategoryToglle] = useState("")
    const [brandToglle,setBrandToglle] = useState("")
    const [priceRangeToglle,setPriceRangeToglle] = useState("")
    const [featuresToglle,setFeaturesToglle] = useState("")
    const [conditionToglle,setConditionToglle] = useState("")
    const [ratingToglle,setRatingToglle] = useState("")
    
    const [gridView, setGridView] = useState("listview")
    const [sortToggle, setSortToggle] = useState('')
    const [minPrice,setMinPrice] = useState("0")
    const [maxPrice,setMaxPrice] = useState("1000")
    const [refresh, setRefresh] = useState(false)

    const queryParams = Object.fromEntries([...searchPramas])

    const userToken = JSON.parse(localStorage.getItem('userToken'))

    const filterToggle = (name) =>{
        if(name === "category"){
            setCategoryToglle((preState) => preState === "" ? "active" : "")
        }
        if(name === "brand"){
            setBrandToglle(((preState) => preState === "" ? "active" : ""))
        }else if(name === "pricerange"){
            setPriceRangeToglle(((preState) => preState === "" ? "active" : ""))
        }
        if(name === "features"){
            setFeaturesToglle(((preState) => preState === "" ? "active" : ""))
        }
        if(name === "condition"){
            setConditionToglle(((preState) => preState === "" ? "active" : ""))
        }
        if(name === "rating"){
            setRatingToglle(((preState) => preState === "" ? "active" : ""))
        }
    }
    
    const addToCart = async (itemId) => {
        if(cartData.map((item) => item.id).includes(itemId)){
            return
        }
                
        try {
            const res = await fetch('https://amazon-digital-prod.azurewebsites.net/api/cart/addincart', {
                method: 'POST',
                headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userToken}`
                },
                body: JSON.stringify({
                    productId: itemId
                })
            })
            setRefresh((preState) => preState === false ? true : false)
        }
        catch (error) {
        }
    }

    const brandFilter = (name,event) => {
        const queryParams = Object.fromEntries([...searchPramas])
        if(event.target.checked){
            fetch(`https://amazon-digital-prod.azurewebsites.net/api/product/products?CategoryId=${queryParams.CategoryId}&PriceFrom=${queryParams.PriceFrom}&PriceTo=${queryParams.PriceTo}&BrandName=${name}`)
            .then(res => res.json())
            .then(res => setFilteredBrand(res))

            setSeachrParams({
                ...queryParams,
                BrandName: (queryParams.BrandName || "") + "," + name
            })
        }else{
            setFilteredBrand([])
            setSeachrParams({
                    CategoryId: categoryId,
                    PriceFrom: minPrice,
                    PriceTo: maxPrice,
                })
            }
    }

    const filterProducts = () => {
            setSeachrParams({
                ...queryParams,
                PriceFrom: minPrice,
                PriceTo: maxPrice,
            })
        }
        
    const getFilteredProduct = async () => {
        try{
            const res = await fetch(`https://amazon-digital-prod.azurewebsites.net/api/product/products?CategoryId=${queryParams.CategoryId}&PriceFrom=${queryParams.PriceFrom}&PriceTo=${queryParams.PriceTo}`)
            const data = await res.json()
            setCategoryItems(data)
        }
        catch (err) {
        }
    }

    useEffect(() => {
        if(search === ""){
            navigate("/")
        }
        setSeachrParams({
            CategoryId: categoryId,
            PriceFrom: minPrice,
            PriceTo: maxPrice,
        })
        
    },[categoryId])

    useEffect(() => {
        if(search === ""){
            return
        }
        getFilteredProduct()

        if(userToken){
            dispatch(getCartData())
        }
    },[dispatch, searchPramas,refresh])

    useEffect(() => {
        dispatch(getCategories())
    },[dispatch,categoryId])
    
    useEffect(() => {
        setCategoryPath(categories.filter(item => item.id === categoryId))
        setCategoryItemBrand([...new Set(categoryItems.map((item) => {
            return item.brand
        }))])
    },[categories, categoryId,categoryItems])
            
    const [width, setWidth] = useState(0)
    const ref = useRef(null);

    useEffect(() => {
        const handleResize = () => {
          setWidth(ref.current.clientWidth);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
            if(width >= 890){
                setSortToggle('')
            }
        }
      }, [width]);
    
    return(
        <>
        <section className={`list-items-section ${sortToggle}`}>
            <div className="list-items-section-container" ref={ref}>

            {sortToggle === "sort-toggle" ? (
                    <div className="sort-right" onClick={() => {
                        setSortToggle("")
                    }}>
                    </div>
                ) : null}
                
                <div className="filter-path">
                    <ul>
                        <li>
                            <div>
                            <span>category</span>
                            </div>
                            <div>
                            <img src={chevronRight} alt="" />
                            </div>
                        </li>
                        <li>
                            <div>
                                {categoryPath.map((item) => {
                                    return(
                                        <span key={item.id}>
                                            {item.name}
                                        </span>
                                    )
                                })}
                            </div>
                            <div>
                            <img src={chevronRight} alt="" />
                            </div>
                        </li>
                    </ul>
                </div>

                <div className={`filter-container ${sortToggle}`}>
                    <div className={`single-filter ${categoryToglle}`}>
                        <div className="filter-title" onClick={() => {filterToggle("category")}}>
                            <div>
                                <span>
                                    Category
                                </span>
                            </div>
                            <div>
                                <img src={chevron_up} alt="" />
                            </div>
                        </div>
                        <div className="filter-category-list">
                            {categories && categories.length ? (
                            <ul>
                                {categories.map((item) => {
                                    return(
                                        <li key={item.id} style={{padding:0}}>
                                            <Categories
                                            categoryName={item.name}
                                            categoryID={item.id}
                                            />
                                        </li>
                                    )
                                })}
                            </ul>
                            ) : (
                                !categoriesError ? (
                                    <h1 className='loading'>
                                    Loading data...
                                    </h1>
                                ) : (
                                    <h1 className='error'>
                                        Something went wrong...
                                    </h1>
                                )
                                )
                            }
                        </div>
                    </div>
                    
                    <div className={`single-filter ${brandToglle}`}>
                        <div className="filter-title" onClick={() => {filterToggle("brand")}}>
                            <div>
                                <span>
                                    Brands
                                </span>
                            </div>
                            <div>
                                <img src={chevron_up} alt="" />
                            </div>
                        </div>
                        <div className="filter-category-list">
                            <ul>
                                {categoryItemBrand.map((item) => {
                                    return(
                                        <li key={item} >
                                            <input type="checkbox" id={item} onChange={(e) => {brandFilter(item, e)}}/>
                                            <label htmlFor={item}>{item}</label>
                                        </li>
                                            )
                                        })}
                            </ul>
                        </div>
                    </div>

                    <div className={`single-filter ${priceRangeToglle}`}>
                        <div className="filter-title" onClick={() => {filterToggle('pricerange')}}>
                            <div>
                                <span>
                                    Price range
                                </span>
                            </div>
                            <div>
                                <img src={chevron_up} alt="" />
                            </div>
                        </div>
                        <div className="filter-price-range">
                            <form onSubmit={(e) => {
                                e.preventDefault()
                                filterProducts()
                                }}>
                                <div className="range">
                                    <div className="range-slider">
                                        <span className="range-selected"></span>
                                    </div>
                                    <div className="range-input">
                                        <input type="range" step={0} max={1000} value={maxPrice} onChange={(e) => {setMaxPrice(e.target.value)}}/>
                                        <input type="range" min={0} max={1000} value={minPrice} onChange={(e) => {setMinPrice(e.target.value)}}/>
                                    </div>
                                    <div className="filter-price-range-inputs">
                                        <div>
                                            <label htmlFor="min">Min</label>
                                            <input type="text" id="min" placeholder="0" value={minPrice} onChange={(e) => {setMinPrice(e.target.value)}}/>
                                        </div>
                                        <div>
                                            <label htmlFor="max">Max</label>
                                            <input type="number" id="max" placeholder="99999" value={maxPrice} onChange={(e) => {setMaxPrice(e.target.value)}}/>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button>
                                        Apply
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className={`single-filter ${featuresToglle}`}>
                        <div className="filter-title" onClick={() => {filterToggle("features")}}>
                            <div>
                                <span>
                                    Features
                                </span>
                            </div>
                            <div>
                                <img src={chevron_up} alt="" />
                            </div>
                        </div>
                        <div className="filter-category-list">
                            <ul>
                                <li>
                                    <input type="checkbox" id="Metallic" />
                                    <label htmlFor="Metallic">Metallic</label>
                                </li>
                                <li>
                                    <input type="checkbox" id="Plastic" />
                                    <label htmlFor="Plastic">Plastic cover</label>
                                </li>
                                <li>
                                    <input type="checkbox" id="Ram" />
                                    <label htmlFor="Ram">8GB Ram</label>
                                </li>
                                <li>
                                    <input type="checkbox" id="power" />
                                    <label htmlFor="power">Super power</label>
                                </li>
                                <li>
                                    <input type="checkbox" id="Memory" />
                                    <label htmlFor="Memory">Large Memory</label>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className={`single-filter ${conditionToglle}`}>
                        <div className="filter-title" onClick={() => {filterToggle("condition")}}>
                            <div>
                                <span>
                                    Condition
                                </span>
                            </div>
                            <div>
                                <img src={chevron_up} alt="" />
                            </div>
                        </div>
                        <div className="filter-category-list">
                            <ul>
                                <li>
                                    <input type="checkbox" />
                                    <label >Metallic</label>
                                </li>
                                <li>
                                    <input type="checkbox" />
                                    <label>Plastic cover</label>
                                </li>
                                <li>
                                    <input type="checkbox"/>
                                    <label>8GB Ram</label>
                                </li>
                                <li>
                                    <input type="checkbox"/>
                                    <label>Super power</label>
                                </li>
                                <li>
                                    <input type="checkbox" />
                                    <label>Large Memory</label>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className={`single-filter ${ratingToglle}`}>
                        <div className="filter-title" onClick={() => {filterToggle("rating")}}>
                            <div>
                                <span>
                                    Rating
                                </span>
                            </div>
                            <div>
                                <img src={chevron_up} alt="" />
                            </div>
                        </div>
                        <div className="filter-category-list">
                            <ul className="filter-stars-rating">
                                <li>
                                    <input type="checkbox" />
                                    <img src={rating5} alt="stars" />
                                </li>
                                <li>
                                    <input type="checkbox" />
                                    <img src={rating4} alt="stars" />
                                </li>
                                <li>
                                    <input type="checkbox" />
                                    <img src={rating3} alt="stars" />
                                </li>
                                <li>
                                    <input type="checkbox" />
                                    <img src={rating2} alt="stars" />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="list-items-container">
                    <div className="list-items-container-header">
                        <div className="wide-width">
                            <div className="item-capacity">
                                <div>
                                    <span>
                                    {categoryItems.length} items in
                                    </span>
                                </div>
                                <div>
                                {categoryPath.map((item) => {
                                    return(
                                        <span key={item.id}>
                                            {item.name}
                                        </span>
                                    )
                                })}
                            </div>
                            </div>

                            <div className="view-options">
                                <div className="verified">
                                    <input type="checkbox" id="verified"/>
                                    <label htmlFor="verified">Verified only</label>
                                </div>

                                <div className="features-selection">
                                    <select>
                                        <option>Featured</option>
                                        <option>Featured</option>
                                        <option>Featured</option>
                                        <option>Featured</option>
                                    </select>
                                </div>

                                <div className="view-buttons" id={gridView}>
                                    <div className="gridview-toggle">
                                        <img src= {gridviewIcon} alt="" onClick={() => {
                                        setGridView("gridview")
                                    }}/>
                                    </div>
                                    <div className="listview-toggle">
                                        <img src={listview} alt="" onClick={() => {
                                        setGridView("listview")
                                    }}/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mobile-width">
                            <div className="sort" onClick={() => {
                                setSortToggle((preState) => preState === "" ? "sort-toggle" : "")
                            }}>
                                <div>
                                    <span>
                                        Sort:
                                    </span>
                                </div>
                                <div className="sort-image">
                                    <img src={sort} alt="" />
                                </div>
                            </div>

                            <div className="filter">
                                <div>
                                    <span>
                                        Filter
                                    </span>
                                </div>
                                <div>
                                    <span>
                                        (3)
                                    </span>
                                </div>
                                <div className="filter-image">
                                    <img src={filter_icon} alt="" />
                                </div>
                            </div>

                            <div className="view-buttons" id={gridView}>
                                    <div className="gridview-toggle">
                                        <img src= {gridviewIcon} alt="" onClick={() => {
                                        setGridView("gridview")
                                    }}/>
                                    </div>
                                    <div className="listview-toggle">
                                        <img src={listview} alt="" onClick={() => {
                                        setGridView("listview")
                                    }}/>
                                    </div>
                            </div>
                        </div>
                    </div>
                    {filteredBrand && filteredBrand.length ? (
                        <div className={`items-list ${gridView}`}>
                            <ul>
                                {filteredBrand.map((item) => {
                                    return(
                                        <li key={item.id}>
                                            <ListSingleItem
                                            nameTogle={gridView}
                                            image={item.images}
                                            name={item.name}
                                            description={item.description}
                                            price={item.price}
                                            addToCart={addToCart}
                                            id={item.id}
                                            />
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    ) : 
                    <div className={`items-list ${gridView}`}>
                        <ul>
                            {categoryItems.map((item) => {
                                return(
                                    <li key={item.id}>
                                        <ListSingleItem
                                            nameTogle={gridView}
                                            image={item.images}
                                            name={item.name}
                                            description={item.description}
                                            price={item.price}
                                            addToCart={addToCart}
                                            id={item.id}
                                        />
                                    </li>
                                )
                            })}
                        </ul>
                    </div>}                    
                </div>
            </div>
        </section>
        </>
    )
}

export default ListItems