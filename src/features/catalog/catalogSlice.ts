import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../app/models/product";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";

const productsAdapter = createEntityAdapter<Product>();

export const fetchProductsAsync = createAsyncThunk<Product[]> (
    'catalog/fetchProductsAsync',
    async () => {
        try {
            return await agent.Catalog.list();
        } catch (error) {
            console.log(error);
        }
    }
)

// quản lý trạng thái về việc tải danh sách sản phẩm từ API lên Redux store
export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productsAdapter.getInitialState({
        productsLoaded: false,
        status: 'idle'
    }),
    reducers: {}, // không có reducers nào được định nghĩa
    extraReducers: (builder => { // dùng extraReducers để xử lý các action liên quan đến async action 'fetchProductsAsync'
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = 'pendingFetchProducts';
        });
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload); // dùng setAll() để cập nhật danh sách sản phẩm trong state
            state.status = 'idle'; // cập nhật trạng thái thành 'ko có gì để cập nhật thêm trạng thái'
            state.productsLoaded = true; // và rồi trả về là load sản phẩm đã thành công
        });
        builder.addCase(fetchProductsAsync.rejected, (state) => {
            state.status = 'idle';  
        })
    })
})

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog);