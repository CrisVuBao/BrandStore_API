import { Button, ButtonGroup, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "../../app/store/configureStore";
import { cong, tru } from "./counterSlice";


export default function ContactPage() {
    const dispatch = useDispatch();
    const {data, title} = useAppSelector(state => state.counter); // lấy các data và state.data, action (data = data + action.payload, data = data - action.payload) của createSlice()

    return (
        <>
            <Typography variant="h3">
                {data} 
            </Typography>
            <Typography variant="h3">
                {title}
            </Typography>
            <ButtonGroup>
                <Button onClick={() => dispatch(tru(1))} variant="contained">-</Button>
                <Button onClick={() => dispatch(cong(1))} variant="contained">+</Button>
                <Button onClick={() => dispatch(cong(5))} variant="contained">+ 5</Button>
            </ButtonGroup>
        </>
    )
}