import { Divider,Grid,Table,TableBody,TableCell,TableContainer,TableRow,TextField,Typography,} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/product";
import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { currencyFormat } from "../../app/util/util";
import { useStoreContext } from "../../app/context/StoreContext";
import { LoadingButton } from "@mui/lab";

export default function ProductDetails() {
    const {basket} = useStoreContext(); // lấy data, properties của Basket
    const { id } = useParams<{ id: string}>(); // usePrams thì truyền tham số vào phải là kiểu string, ko truyền kiểu number vào được (vì gốc của nó là kiểu string)
    const [itemProduct, setProduct] = useState<Product | null>(null); // truyền model Product vào trong useState để quản lý sản phẩm
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const item = basket?.items.find(i => i.productId === itemProduct?.id); // so sánh xem productId của Product có bằng productId của Basket hay không

    useEffect(() => {
        if (item) setQuantity(item.quantity); // thêm số lượng(quantity) từ ProductDetails vào trong Basket
        id && agent.Catalog.details(parseInt(id))
            .then((Response) => setProduct(Response))
            .catch((error) => console.log(error.Response))
            .finally(() => setLoading(false)); // cuối cùng nếu lỗi thì là false
    }, [id, item]);

    if (loading) return <LoadingComponent />;
    if (!itemProduct) return <NotFound />; // nếu id sản phẩm ko có, thì sẽ chuyển qua NotFound

    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img
                    src={itemProduct.pictureUrl}
                    alt={itemProduct.name}
                    style={{ width: "100%" }}
                />
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h3">{itemProduct.name}</Typography>
                <Divider sx={{ mb: 2 }} />{" "}  {/*tạo 1 dải đường nhỏ, gạch chân bên dưới content */}   
                <Typography variant="h4" color="primary">
                    {currencyFormat(itemProduct.price)}
                </Typography>
                {/*Bên dưới là phần Table thông tin product */}
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{itemProduct.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{itemProduct.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{itemProduct.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{itemProduct.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity in stock</TableCell>
                                <TableCell>{itemProduct.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={2}>
                    <Grid item xs={6}> {/*xs: là muốn truyền bao nhiều số cột bên trong, như đây là Grid sẽ lấy 6 cột trong 12 cột */}
                        <TextField 
                            variant="outlined"
                            type="number"
                            label='Quantity in Cart'
                            fullWidth
                            value={quantity}
                        />
                    </Grid>
                    <Grid item xs={6}> {/*xs: là muốn truyền bao nhiều số cột bên trong, như đây là Grid sẽ lấy 6 cột trong 12 cột */}
                        <LoadingButton
                            sx={{height: '55px'}}
                            color="primary"
                            size="large"
                            variant="contained"
                            fullWidth
                        >
                            {item ? 'Update Quantity' : 'Add to Cart'}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
