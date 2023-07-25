import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

interface Props {
    products: Product[];
    addProduct: () => void;
}

const Catalog = ({products,addProduct}: Props) => {
    return ( // this is place generate UI 
        <>
            <ProductList products={products} /> {/* đây cũng giống như hàm khởi tạo được gọi bên hàm Main trong C# */}
            <Button variant="contained" onClick={addProduct}>Click add product</Button>
        </>

    )
}

export default Catalog;