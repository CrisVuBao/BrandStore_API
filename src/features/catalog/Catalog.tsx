import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import ProductList from "./ProductList";
import { useEffect } from "react";
import { fetchFilters, fetchProductsAsync, productSelectors, setPageNumber, setProductParams } from "./catalogSlice";
import { Box, Grid, Pagination, Paper, Radio, RadioGroup, Typography } from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import CheckboxButtons from "../../app/components/CheckboxButtons";
import { Type } from "react-toastify/dist/utils";
import AppPagination from "../../app/components/AppPagination";

const sortOptions = [
    { value: 'name', label: 'Alphabetical' },
    { value: 'priceDesc', label: 'Price - High to low' },
    { value: 'price', label: 'Price - Low to high' }
]

export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll);
    const { productsLoaded, status, filtersLoaded, brands, types, productParams, metaData } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch]); // nếu giá trị ở trong mảng [productsLoaded] thay đổi, thì useEffect sẽ được gọi lại và thực thi lại hàm bên trong nó

    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFilters());
    }, [dispatch, filtersLoaded]);

    if (status.includes('pending') || !metaData) return <LoadingComponent message="Loading products..." />

    return ( // this is place generate UI 
        <>
            <Grid container spacing={4}>
                <Grid item xs={3}>
                    <Paper sx={{ mb: 2, mt: 4 }}>
                        <ProductSearch />
                    </Paper>
                    <Paper sx={{ mb: 2, p: 2 }}>
                        <RadioButtonGroup
                            selectedValue={productParams.orderBy}
                            options={sortOptions}
                            onChange={(e) => dispatch(setProductParams({ orderBy: e.target.value }))}
                        />
                    </Paper>
                    <Paper sx={{ mb: 2, p: 2 }}>
                        <CheckboxButtons
                            items={brands} // tên các brands
                            checked={productParams.brands} // check vào sẽ lấy các brands mà mình check vào
                            onChange={(items: string[]) => dispatch(setProductParams({ brands: items }))} // đoạn khi check vào brands nào, sẽ ra dữ liệu product có tên brand đó
                        />
                    </Paper>
                    <Paper sx={{ p: 2 }}>
                        <CheckboxButtons
                            items={types}
                            checked={productParams.types}
                            onChange={(items: string[]) => dispatch(setProductParams({ brands: items }))}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={9}>
                    <ProductList products={products} /> {/* đây cũng giống như hàm khởi tạo được gọi bên hàm Main trong C# */}
                </Grid>
                <Grid item xs={3} />
                <Grid item xs={9} sx={{ mb: 2 }}>
                    <AppPagination
                        metaData={metaData}
                        onPageChange={(page: number) => dispatch(setPageNumber({ pageNumber: page }))}
                    />
                </Grid>
            </Grid>
        </>

    )
}