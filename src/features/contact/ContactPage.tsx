import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { CounterState } from "./counterReducer";


export default function ContactPage() {
    const {data, title} = useSelector((state: CounterState) => state) // tạo 1 useSelector để lựa chọn dữ liệu có trong interface có trong counterReducer.ts, và truyền dữ liệu có trong Inferface CounterState ra ngoài

    return (
        <>
            <Typography variant="h3">
                {data}
            </Typography>
            <Typography variant="h3">
                {title}
            </Typography>
        </>
    )
}