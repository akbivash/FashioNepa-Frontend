import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { publicRequest } from "../requestMethods"

export const useFetch = (page) => {
    const [limit, setLimit] = useState(4)
    const category = useParams().category
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const location = useLocation()
    
    let id = location.pathname.split("/")[2]
    if (id === 'product' || id === category) {
        id = location.pathname.split("/")[3]
    }

    useEffect(() => {
        const getProducts = async () => {
            setIsLoading(true)
            try {

                const res = await publicRequest.get(
                    category
                        ? `api/v1/products/?category=${category}`
                        : location.pathname === '/products' ?  `api/v1/products/?page=1&limit=10`
                        : `api/v1/products/?page=${page}&limit=${limit}`
                );
                setProducts(res.data)
                setIsLoading(false)
            } catch (err) {
                setIsError(true)
                setIsLoading(false)
            }
        }
        getProducts()
    }, [page, category])

    useEffect(() => {
        const getProduct = async () => {
            setIsLoading(true)
            try {
                const res = await publicRequest.get(`api/v1/products/${id}`)
                setProduct(res.data)

                setIsLoading(false)
            } catch (err) {
                setIsError(true)
                setIsLoading(false)
            }
        }
        getProduct()
    }, [id])

    return { products, product, isError, isLoading, limit, category }

}