import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import ProductList from "./ProductList";
import { useEffect } from "react";
import { fetchFilters, fetchProductsAsync, productSelectors, setProductParams } from "./catalogSlice";
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, Pagination, Paper, Radio, RadioGroup, Typography } from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";

const sortOptions = [
    { value: 'name', label: 'Alphabetical' },
    { value: 'priceDesc', label: 'Price - High to low' },
    { value: 'price', label: 'Price - Low to high' }
]

export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll);
    const { productsLoaded, status, filtersLoaded, brands, types, productParams } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch]); // nếu giá trị ở trong mảng [productsLoaded] thay đổi, thì useEffect sẽ được gọi lại và thực thi lại hàm bên trong nó

    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFilters());
    }, [dispatch, filtersLoaded]);

    if (status.includes('pending')) return <LoadingComponent message="Loading products..." />

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
                        <FormGroup>
                            {brands.map(brand => (
                                <FormControlLabel control={<Checkbox />} label={brand} key={brand} />
                            ))}
                        </FormGroup>
                    </Paper>
                    <Paper sx={{ p: 2 }}>
                        <FormGroup>
                            {types.map(type => (
                                <FormControlLabel control={<Checkbox />} label={type} key={type} />
                            ))}
                        </FormGroup>
                    </Paper>
                </Grid>
                <Grid item xs={9}>
                    <ProductList products={products} /> {/* đây cũng giống như hàm khởi tạo được gọi bên hàm Main trong C# */}
                </Grid>
                <Grid item xs={3} />
                <Grid item xs={9} sx={{ mb: 2 }}>
                    <Box display='flex' justifyContent='space-between' alignItems='center' >
                        <Typography>
                            1-6 item
                        </Typography>
                        <Pagination
                            color='primary'
                            size='large'
                            count={10}
                            page={2}
                        />
                    </Box>
                </Grid>
            </Grid>
        </>

    )
}