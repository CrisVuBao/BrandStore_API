import { Box, Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Add, Delete, Remove} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import BasketSumTotal from "./BasketSumTotal";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync, setBasket } from "./basketSlice";

export default function BasketPage() {
  const {basket, status} = useAppSelector(state => state.basket); // {basket} là giá trị được tham chiếu tới useStoreContext() để lấy các dữ liệu, thuộc tính từ bên useStoreContext()
  const dispatch = useAppDispatch();

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
                      loading={status === 'pendingRemoveItem' + item.productId + 'rem'} 
                      color="error" 
                      onClick={() => dispatch(removeBasketItemAsync({
                          productId: item.productId, quantity: 1, name: 'rem'
                        }))}> {/*đây là xóa theo từng productId, hết productId này còn productId khác, dù có trùng productId */}
                      <Remove />
                    </LoadingButton>  
                    {item.quantity}
                    <LoadingButton 
                      loading={status === 'pendingAddItem' + item.productId} 
                      color="primary" 
                      onClick={() => dispatch(addBasketItemAsync({productId: item.productId}))}>
                      <Add />
                    </LoadingButton>  
                  </TableCell>
                  <TableCell align="right">{(item.price * item.quantity).toFixed(3)} VNĐ</TableCell>
                  <TableCell align="right">
                      <LoadingButton
                        loading={status === 'pendingRemoveItem' + item.productId + 'del'} 
                        color="error" 
                        onClick={() => dispatch(removeBasketItemAsync({
                            productId: item.productId, quantity: item.quantity, name: 'del'
                          }))}> {/*item.quantity là xóa cả productId, và xóa hết luôn số lượng product trong giỏ hàng */}
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