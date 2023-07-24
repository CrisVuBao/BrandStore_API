import { Product } from "../../app/models/product";

interface Props {
    products: Product[];
    addProduct: () => void;
}

const Catalog = ({products,addProduct}: Props) => { // props là parameter ánh xạ đến products,addProduct bên App.tsx, để lấy và sử dụng các thuộc tính của products
    return ( // this is place generate UI 
        <>
            <ul>
                {products.map((itemProduct) => ( // itemProduct là tham số để tham chiếu đến products, để lấy các thuộc tính, dữ liệu trong products
                    <li key={itemProduct.id}>{itemProduct.name} - {itemProduct.price} - {itemProduct.pictureUrl}</li> // dấu "-" là của code html
                ))}
            </ul>
            <button onClick={addProduct}>Click add product</button>
        </>

    )
}

export default Catalog;