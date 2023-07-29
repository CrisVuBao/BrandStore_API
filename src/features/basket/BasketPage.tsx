import { Box, Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Add, Delete, Remove} from "@mui/icons-material";
import { useState } from "react";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import BasketSumTotal from "./BasketSumTotal";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { removeItem, setBasket } from "./basketSlice";

export default function BasketPage() {
  const {basket} = useAppSelector(state => state.basket); // {basket} là giá trị được tham chiếu tới useStoreContext() để lấy các dữ liệu, thuộc tính từ bên useStoreContext()
  const dispatch = useAppDispatch();

  // Trừ hoặc Cộng, hoặc Remove sản phẩm trong Basket, Thêm setStatus để icon Loading sẽ quay từng button riêng lẻ, ko quay chung nữa (BasketPage.tsx)
  const [status, setStatus] = useState({
    loading: false,
    name: ''
  });

  // cộng thêm số lượng sản phẩm muốn thêm
  const handleAddItem = (productId: number, name: string) => {
    setStatus({loading: true, name});
    agent.Basket.addItem(productId) // thêm sản phẩm theo productId
      .then(basket => dispatch(setBasket(basket))) // dispatch gửi các action lên cho Redux quản lý
      .catch(error => console.log(error))
      .finally(() => setStatus({loading: false, name: ''}))
  }

  // trừ đi số lượng sản phẩm trong Basket
  const handleRemoveItem = (productId: number, quantity = 1, name: string)  => {
    setStatus({loading: true, name});
    agent.Basket.removeItem(productId, quantity)
        .then(() => dispatch(removeItem({productId, quantity}))) // vì các tham số productId, quantity của bên removeItem của Slice được khởi tạo là danh sách object, nên bên này cũng phải truyền {productId, quantity} để nó cũng là truyền vào object
        .catch(error => console.log(error))
        .finally(() => setStatus({loading: false, name: ''}))
  }

  if (!basket) return <Typography variant="h3">Basket Empty !!!</Typography>
    
    return (
      <>
          <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} >
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Total</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {basket.items.map(item => (
                <TableRow
                  key={item.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Box display='flex' alignItems='center'>
                      <img src={item.pictureUrl} alt={item.name} style={{height: 50, marginRight: 20}}/>
                      {item.name}
                    </Box>
                  </TableCell>
                  <TableCell align="right">{(item.price / 100).toFixed(3)} VNĐ</TableCell>
                  <TableCell align="center">
                    <LoadingButton 
                      loading={status.loading && status.name === 'rem' + item.productId } 
                      color="error" 
                      onClick={() => handleRemoveItem(item.productId, 1, 'rem' + item.productId)}> {/*đây là xóa theo từng productId, hết productId này còn productId khác, dù có trùng productId */}
                      <Remove />
                    </LoadingButton>  
                    {item.quantity}
                    <LoadingButton loading={status.loading && status.name === 'add' + item.productId} 
                      color="primary" 
                      onClick={() => handleAddItem(item.productId, 'add' + item.productId)}>
                      <Add />
                    </LoadingButton>  
                  </TableCell>
                  <TableCell align="right">{(item.price * item.quantity).toFixed(3)} VNĐ</TableCell>
                  <TableCell align="right">
                      <LoadingButton
                        loading={status.loading && status.name === 'del' + item.productId} 
                        color="error" 
                        onClick={() => handleRemoveItem(item.productId, item.quantity, 'del' + item.productId)}> {/*item.quantity là xóa cả productId, và xóa hết luôn số lượng product trong giỏ hàng */}
                          <Delete />
                      </LoadingButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container>
          <Grid item xs={6}/>
          <Grid item xs={6}>
            <BasketSumTotal /> {/**Component tổng tiền */}
            <Button 
              component={Link} // của React Router, để link đến các Route
              to='/checkout'
              variant='contained'
              size='large'
              fullWidth
            >
              Checkout
            </Button>
          </Grid>
        </Grid>
      </>
    )
}