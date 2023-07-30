import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product, ProductParams } from "../../app/models/product";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";

interface CatalogState {
    productsLoaded: boolean;
    filtersLoaded: boolean;
    status: string;
    brands: string[];
    types: string[];
    productParams: ProductParams; // biến truy vấn product
}

const productsAdapter = createEntityAdapter<Product>();

function getAxiosParams(productParams: ProductParams) {
    const params = new URLSearchParams();
    params.append('pageNumber', productParams.pageNumber.toString()); // append(name, value)
    params.append('pageSize', productParams.pageSize.toString());
    params.append('orderBy', productParams.orderBy);
    if (productParams.searchTerm) params.append('searchTerm', productParams.searchTerm);
    if (productParams.brands) params.append('brands', productParams.brands.toString());
    if (productParams.types) params.append('pagaNumber', productParams.types.toString());
    return params;
}

// fetch danh sách product
export const fetchProductsAsync = createAsyncThunk<Product[], void, {state: RootState }> (
    'catalog/fetchProductsAsync',
    async (_, thunkAPI) => {
        const params = getAxiosParams(thunkAPI.getState().catalog.productParams);
        try {
            return await agent.Catalog.list(params);
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

function initParams() {
    return {
        pageNumber: 1,
        pageSize: 6,
        orderBy: 'name'
    }
}

// quản lý trạng thái về việc tải danh sách sản phẩm từ API lên Redux store
export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productsAdapter.getInitialState<CatalogState>({
        productsLoaded: false,
        filtersLoaded: false,
        status: 'idle',
        brands: [],
        types: [],
        productParams: initParams()
    }),
    reducers: {
        setProductParams: (state, action) => {
            state.productsLoaded = false;
        },
        resetProductParams: (state) => {
            state.productParams = initParams();
        }
    }, // reducers setProductParams được định nghĩa
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

export const {setProductParams, resetProductParams} = catalogSlice.actions;