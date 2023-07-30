import { TextField, debounce } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setProductParams } from "./catalogSlice";
import { useState } from "react";

export default function ProductSearch() {
    const { productParams } = useAppSelector(state => state.catalog)
    const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
    const dispatch = useAppDispatch();

    const debouncedSearch = debounce((event: any) => {
        dispatch(setProductParams({ searchTerm: event.target.value }))
    }, 1000); // chờ khoảng thời gian nào đó thì mới gửi action lên cho Redux, để thực hiện chức năng Search truy vấn sản phẩm

    return (
        <TextField
            label='Search products'
            variant="outlined"
            fullWidth
            value={searchTerm || ''}
            onChange={(event: any) => {
                setSearchTerm(event.target.value) // set giá trị(nhập tên vào ô input)
                debouncedSearch(event); // bắt đầu search sau 1 giây
            }}
        />
    )
}