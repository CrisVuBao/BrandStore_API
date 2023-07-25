import {Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/models/product";

interface Props {
    itemProduct : Product;
}

const ProductCard = ({itemProduct} : Props) => {
    return (
        <Card>
        <CardMedia
          sx={{ height: 140 }}
          image={itemProduct.pictureUrl}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Item
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis deleniti similique laborum vel quidem iste nisi nesciunt perferendis doloribus hic necessitatibus alias officia maiores, voluptas quisquam dolorum rem quaerat dignissimos.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">{itemProduct.price} $</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    )
}

export default ProductCard;