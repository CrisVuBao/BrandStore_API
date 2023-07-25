import { ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import { Product } from "../../app/models/product";

interface Props {
    itemProduct : Product;
}

const ProductCard = ({itemProduct} : Props) => {
    return (
        <ListItem key={itemProduct.id}>
            <ListItemAvatar>
                <Avatar src={itemProduct.pictureUrl} />
            </ListItemAvatar>
            <ListItemText>
                {itemProduct.name} - {itemProduct.price}
            </ListItemText>
        </ListItem> // dấu "-" là của code html
    )
}

export default ProductCard;