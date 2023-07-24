import React, { useEffect, useState } from 'react'; // this is React Hook
import logo from './logo.svg';
import {Product} from './product';

const App = () => { // Function Components
  const [products, setProduct] = useState<Product[]>([]);

  const addProduct = () => {
    // prevProduct là tham số đầu vào, tham chiếu đến hàm product để lấy các thuộc tính trong product
    setProduct(prevProduct => [...prevProduct, 
    {
      // phần này là thêm các thuộc tính từ product.ts, để thêm mới product
      id: prevProduct.length + 101,
      name: `TV` + (prevProduct.length + 1), 
      price: (prevProduct.length * 100) + 100,
      brand: "brand",
      description: "description",
      pictureUrl: 'http://picsum.photos/200'
    }]);
  }

  useEffect(() => {
    fetch('https://localhost:44386/api/Products')
      .then(response => response.json())
      .then(data => setProduct(data)) //! đoạn này là lấy data từ response,json() để trả ra cho "products" trong useState()
  }, []); // [] không giới hạn time

  // phần xử lý UI
  return (
    <div className='app'>
      <h1>Brand-Store</h1>
      <ul>
        {products.map((itemProduct) => ( // itemProduct là tham số để tham chiếu đến products, để lấy các thuộc tính, dữ liệu trong products
          <li key={itemProduct.id}>{itemProduct.name} - {itemProduct.price} - {itemProduct.pictureUrl}</li> // dấu "-" là của code html
        ))}
      </ul>
      <button onClick={addProduct}>Click add product</button>
    </div>
  );
}

export default App;
