import {Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/models/product";

interface Props {
    itemProduct : Product;
}

const ProductCard = ({itemProduct} : Props) => {
    return (
        <Card>
            <CardHeader 
                avatar={
                    <Avatar sx={{bgcolor: 'primary.main'}}>
                        {itemProduct.name.charAt(0).toUpperCase()} {/*CharAt(0): lấy kí tự thứ index 0, toUpperCase: viết hoa */}
                    </Avatar>
                }
                title={itemProduct.name}
                titleTypographyProps={{
                    sx: {fontWeight: 'bold', color: 'primary.main'}
                }}
            />
            <CardMedia
                sx={{ height: 140, backgroundSize: 'contain', bgcolor: 'primary.light'}}
                image={itemProduct.pictureUrl}
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom color="secondary" variant="h5">
                    {(itemProduct.price / 100).toFixed(3)} VNĐ
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {itemProduct.brand} / {itemProduct.type}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">ADD TO CART</Button>
                <Button size="small">VIEW</Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard;