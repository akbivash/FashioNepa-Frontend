import { useParams } from "react-router-dom"
import { useState } from "react"

export const useCustomHook = () => {
    const[page, setPage] = useState(1)
const[limit, setLimit] = useState(4)
 const categoryRoute = useParams().category
 return {categoryRoute,page,limit}
}