import {Grid } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";

interface Props {
    products: Product[]; // khai báo variable
}

export default function ProductList({products} : Props) {
    return (
        <Grid container spacing={4} sx={{mt: 0}}>
            {products.map((itemProduct) => ( // itemProduct là tham số để tham chiếu đến products, để lấy các thuộc tính, dữ liệu trong products
                <Grid item xs={3} key={itemProduct.id}> {/* mỗi product chiếm 4 colunm,  */}
                    <ProductCard  itemProduct={itemProduct}/>
                </Grid>
            ))}
        </Grid>
    )
}