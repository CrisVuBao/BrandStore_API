import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../app/models/product";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";

const productsAdapter = createEntityAdapter<Product>();

// fetch danh sách product
export const fetchProductsAsync = createAsyncThunk<Product[]> (
    'catalog/fetchProductsAsync',
    async (_, thunkAPI) => {
        try {
            return await agent.Catalog.list();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        } 
    }
)

// fetch product đơn lẻ
export const fetchProductAsync = createAsyncThunk<Product, number> (
    'catalog/fetchProductAsync',
    async (productId, thunkAPI) => {
        try {
            return await agent.Catalog.details(productId); // lấy từng product theo Id
        } catch (error: any) {
                return thunkAPI.rejectWithValue({error: error.data})
            }
    }
)

// fetch Brands, Type
export const fetchFilters = createAsyncThunk(
    'catalog/fetchFilters',
    async (_, thunkAPI) => {
        try {
            return agent.Catalog.fetchFilters();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

// quản lý trạng thái về việc tải danh sách sản phẩm từ API lên Redux store
export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productsAdapter.getInitialState({
        productsLoaded: false,
        filtersLoaded: false,
        status: 'idle',
        brands: [],
        types: []
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
        builder.addCase(fetchProductsAsync.rejected, (state, action) => {
            console.log(action);
            state.status = 'idle';  
        });
        builder.addCase(fetchProductAsync.pending, (state) => { 
            state.status = 'pendingFetchProduct';
        });
        builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchProductAsync.rejected, (state, action) => {
            console.log(action);
            state.status = 'idle';
        });
        builder.addCase(fetchFilters.pending, (state) => {
            state.status = 'pendingFetchFilters';
        });
        builder.addCase(fetchFilters.fulfilled, (state, action) => {
            state.brands = action.payload.brands;
            state.types = action.payload.types;
            state.filtersLoaded = true;
            state.status = 'idle';
        });
        builder.addCase(fetchFilters.rejected, (state, action) => {
            state.status = 'idle';
            console.log(action.payload);
        })
    })
})

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog);