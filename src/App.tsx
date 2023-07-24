import React, { useEffect, useState } from 'react'; // this is React Hook
import logo from './logo.svg';

const App = () => { // Function Components
  const [product, setProduct] = useState(
    [
      {name: "TV 1", display: 10},
      {name: "TV 2", display: 20}
    ]
  );

  const addProduct = () => {
    // prevProduct là tham số đầu vào, tham chiếu đến hàm product để lấy các thuộc tính trong product
    setProduct(prevProduct => [...prevProduct, {name: `TV` + (prevProduct.length + 1), display: (prevProduct.length * 10) + 10}]); // ...product: lấy tất cả các giá trị đã có trước đó
    // ! khi muốn tính toán thì phải đóng ngoặc hẳn hoi (prevProduct + 1)
  }

  useEffect(() => {
    fetch('https://localhost:44386/api/Products')
      .then(response => response.json())
      .then(data => setProduct(data))
  }, []); // [] không giới hạn time

  return (
    <div className='app'>
      <h1>Brand-Store</h1>
      <ul>
        {product.map((itemProduct, index) => (
          <li key={index}>{itemProduct.name} - {itemProduct.display}</li> // dấu "-" là của code html
        ))}
      </ul>
      <button onClick={addProduct}>Click add product</button>
    </div>
  );
}

export default App;
