import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"
import { Product } from "../../app/models/product";

const ProductDetails = () => {
    const {id} = useParams<{id: string}>();
    const [itemProduct, setProduct] = useState<Product | null>(null); // truyền model Product vào trong useState để quản lý sản phẩm
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://localhost:44386/api/Products/${id}`)
            .then(Response => setProduct(Response.data))
            .catch(error => console.log(error))
            .finally(() => setLoading(false)); // cuối cùng nếu lỗi thì là false
    }, [id])

    if(loading) return <h5>..loading</h5>
    if (!itemProduct) return <h3>not product</h3>

    return (
        <Typography variant="h1">
            {itemProduct.name}
        </Typography>
    )
}

export default ProductDetails;