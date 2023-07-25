import { List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";

interface Props {
    products: Product[]; // khai báo variable
}

const ProductList = ({products} : Props) => {
    return (
        <List>
            {products.map((itemProduct) => ( // itemProduct là tham số để tham chiếu đến products, để lấy các thuộc tính, dữ liệu trong products
                <ProductCard key={itemProduct.id} itemProduct={itemProduct}/>
            ))}
        </List>
    )
}

export default ProductList;