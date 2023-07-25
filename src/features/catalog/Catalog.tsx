import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";

const Catalog = () => {
    const [products, setProduct] = useState<Product[]>([]);
  
    useEffect(() => {
      fetch('https://localhost:44386/api/Products')
        .then(response => response.json())
        .then(data => setProduct(data)) //! đoạn này là lấy data từ response,json() để trả ra cho "products" trong useState()
    }, []); // [] không giới hạn time

    return ( // this is place generate UI 
        <>
            <ProductList products={products} /> {/* đây cũng giống như hàm khởi tạo được gọi bên hàm Main trong C# */}
        </>

    )
}

export default Catalog;