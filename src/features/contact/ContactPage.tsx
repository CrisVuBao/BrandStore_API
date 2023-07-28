import { Button, ButtonGroup, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Cong, CounterState, Tru, cong, tru } from "./counterReducer";


export default function ContactPage() {
    const {data, title} = useSelector((state: CounterState) => state) // tạo 1 useSelector để lựa chọn dữ liệu có trong interface có trong counterReducer.ts, và truyền dữ liệu có trong Inferface CounterState ra ngoài
    const dispatch = useDispatch();

    return (
        <>
            <Typography variant="h3">
                {data}
            </Typography>
            <Typography variant="h3">
                {title}
            </Typography>
            <ButtonGroup>
                <Button onClick={() => dispatch(tru())} variant="contained">-</Button>
                <Button onClick={() => dispatch(cong())} variant="contained">+</Button>
                <Button onClick={() => dispatch(cong(5))} variant="contained">+ 5</Button>
            </ButtonGroup>
        </>
    )
}