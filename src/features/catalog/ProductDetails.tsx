import {
    Divider,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Product } from "../../app/models/product";

const ProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [itemProduct, setProduct] = useState<Product | null>(null); // truyền model Product vào trong useState để quản lý sản phẩm
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`https://localhost:44386/api/Products/${id}`)
            .then((Response) => setProduct(Response.data))
            .catch((error) => console.log(error))
            .finally(() => setLoading(false)); // cuối cùng nếu lỗi thì là false
    }, [id]);

    if (loading) return <h5>..loading</h5>;
    if (!itemProduct) return <h3>not product</h3>;

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
                    {(itemProduct.price / 100).toFixed(3)} VNĐ
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
            </Grid>
        </Grid>
    );
};

export default ProductDetails;
