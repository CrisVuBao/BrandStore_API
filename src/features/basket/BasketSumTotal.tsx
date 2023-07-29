import { TableContainer, Paper, Table, TableBody, TableRow, TableCell, Typography } from "@mui/material";
import { currencyFormat } from "../../app/util/util";
import { useAppSelector } from "../../app/store/configureStore";

export default function BasketSumTotal() {
    const {basket} = useAppSelector(state => state.basket);

    // Biểu thức item.quantity * item.price tính giá trị của một phần tử trong mảng (tích giá tiền của một sản phẩm với số lượng của nó).
// Tham số thứ hai của reduce là giá trị khởi tạo ban đầu cho biến sum, ở đây là 0.
// "??" 0: Nếu kết quả sau khi tính toán reduce là undefined (do basket hoặc basket.items không tồn tại), hoặc là một giá trị không xác định (NaN), thì ?? 0 sẽ gán giá trị 0 cho subtotal.    
    const subtotal = basket?.items.reduce((sum, item) => sum + (item.quantity * item.price), 0) ?? 0;
    const deliveryFee = subtotal > 1000 ? 0 : 3000;

    return (
        <>
            <TableContainer component={Paper} variant={'outlined'}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">{currencyFormat(subtotal)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Delivery fee*</TableCell>
                            <TableCell align="right">{currencyFormat(deliveryFee)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">{currencyFormat(subtotal + deliveryFee)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <span style={{fontStyle: 'italic'}}>*Orders over $100 qualify for free delivery</span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}