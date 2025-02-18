import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const ProductsWeb = () => {
    const dispatch = useDispatch
    const webproducts = useSelector((state) => state.productsReducer.productsweb);

    useEffect ({
        
    },[])

}

export default ProductsWeb