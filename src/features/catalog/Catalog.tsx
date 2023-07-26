import agent from "../../app/api/agent";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";

const Catalog = () => {
    const [products, setProduct] = useState<Product[]>([]);
  
    useEffect(() => {
        agent.Catalog.list().then(products => setProduct(products))
    }, []);

    return ( // this is place generate UI 
        <>
            <ProductList products={products} /> {/* đây cũng giống như hàm khởi tạo được gọi bên hàm Main trong C# */}
        </>

    )
}

export default Catalog;