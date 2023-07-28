import {Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
import { useState } from "react";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import { useStoreContext } from "../../app/context/StoreContext";

interface Props {
    itemProduct : Product;
}

export default function ProductCard({itemProduct} : Props) {
    const [loading, setLoading] = useState(false);
    const {setBasket} = useStoreContext();

    const handleAddItem = (productId: number) => {
        setLoading(true);
        agent.Basket.addItem(productId)
            .then(basket => setBasket(basket))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }

    return (
        <Card sx={{borderRadius: 2.5}}>
            <CardHeader 
                avatar={
                    <Avatar sx={{bgcolor: 'primary.main'}}>
                        {itemProduct.name.charAt(0).toUpperCase()} {/*CharAt(0): lấy kí tự thứ index 0, toUpperCase: viết hoa*/}
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
                <LoadingButton
                    loading={loading}
                    onClick={() => handleAddItem(itemProduct.id)}
                >ADD TO CART</LoadingButton>
                <Button size="small" component={Link} to={`/catalog/${itemProduct.id}`}>VIEW</Button>
            </CardActions>
        </Card>
    )
}