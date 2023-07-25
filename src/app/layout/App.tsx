import React, { useEffect, useState } from 'react'; // this is React Hook
import logo from './logo.svg';
import {Product} from '../models/product';
import Header from './Header';
import Catalog from '../../features/catalog/Catalog';
import { Container, CssBaseline, List, Typography } from '@mui/material';

const App = () => { // Function Components
  const [products, setProduct] = useState<Product[]>([]);
  const [count, setCount] = useState(0);

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
    <div className='app'> {/* dấu <> </> là parents dùng để nhúng html bên trong */}
        <CssBaseline/> {/*cho phần Header sát đầu web, cho ko còn khoảng trống trên đầu */}
        <Header/>
        <Container>
          <Catalog products={products} addProduct={addProduct}/> {/*products=, addProduct= là attribute */}
        </Container>
        
    </div> 
  );
}

export default App;
