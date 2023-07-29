import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";

export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll);
    const {productsLoaded, status} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch]); // nếu giá trị ở trong mảng [productsLoaded] thay đổi, thì useEffect sẽ được gọi lại và thực thi lại hàm bên trong nó

    if (status.includes('pending')) return <LoadingComponent message="Loading products..."/>

    return ( // this is place generate UI 
        <>
            <ProductList products={products} /> {/* đây cũng giống như hàm khởi tạo được gọi bên hàm Main trong C# */}
        </>

    )
}