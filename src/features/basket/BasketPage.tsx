import { Box, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Add, Delete, Remove} from "@mui/icons-material";
import { useStoreContext } from "../../app/context/StoreContext";
import { useState } from "react";
import agent from "../../app/api/agent";
import { error } from "console";
import { LoadingButton } from "@mui/lab";
import { loadavg } from "os";
import BasketSumTotal from "./BasketSumTotal";

export default function BasketPage() {
  const {basket, setBasket, removeItem} = useStoreContext(); // {basket} là giá trị được tham chiếu tới useStoreContext() để lấy các dữ liệu, thuộc tính từ bên useStoreContext()
  const [fixCommit, setFixCommit] = useState("");

  // Trừ hoặc Cộng, hoặc Remove sản phẩm trong Basket, Thêm setStatus để icon Loading sẽ quay từng button riêng lẻ, ko quay chung nữa (BasketPage.tsx)
  const [status, setStatus] = useState({
    loading: false,
    name: ''
  });

  // cộng thêm số lượng sản phẩm muốn thêm
  const handleAddItem = (productId: number, name: string) => {
    setStatus({loading: true, name});
    agent.Basket.addItem(productId) // thêm sản phẩm theo productId
      .then(basket => setBasket(basket))
      .catch(error => console.log(error))
      .finally(() => setStatus({loading: false, name: ''}))
  }

  // trừ đi số lượng sản phẩm trong Basket
  const handleRemoveItem = (productId: number, quantity = 1, name: string)  => {
    setStatus({loading: true, name});
    agent.Basket.removeItem(productId, quantity)
        .then(() => removeItem(productId, quantity))
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
            <BasketSumTotal />
          </Grid>
        </Grid>
      </>
    )
}