import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { publicRequest } from "../requestMethods"

export const useFetch = () => {
    const category = useParams().category
    const [products, setProducts] = useState([])
    const[allProducts, setAllProducts] = useState([])
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
        try {
            setIsLoading(true)

            const res = await publicRequest.get(`api/v1/products/` );
            setAllProducts(res.data)
            setIsLoading(false)
        } catch (err) {
            setIsError(true)
            setIsLoading(false)
        }
    }
    getProducts()
},[])

    useEffect(() => {
        const getProducts = async () => {
            try {
                setIsLoading(true)

                const res = await publicRequest.get(
                    category
                        ? `api/v1/products/?category=${category}`
                        : `api/v1/products/?page=1&limit=10`
                );
                setProducts(res.data)
                setIsLoading(false)
            } catch (err) {
                setIsError(true)
                setIsLoading(false)
            }
        }
        getProducts()
       
    }, [ category])

    useEffect(() => {
        const getProduct = async () => {
            try {
            setIsLoading(true)

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

    return { products, product, isError, isLoading,category, allProducts }

}