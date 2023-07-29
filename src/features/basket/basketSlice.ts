import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../app/models/basket";
import agent from "../../app/api/agent";

interface BasketState {
    basket: Basket | null,
    status: string;
}

const initialState: BasketState = {
    basket: null,
    status: 'idle'
}

// khởi tạo ReduxThunk (để áp dụng async, await) cho việc thêm sản phẩm vào giỏ
export const addBasketItemAsync = createAsyncThunk<Basket, {productId: number , quantity?: number} > (
    'basket/addBasketItemAsync',
    async ({productId, quantity = 1}, thunkAPI) => {
        try {
            return await agent.Basket.addItem(productId, quantity);
        } catch(error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

//  khởi tạo ReduxThunk (để áp dụng async, await) cho việc xóa sản phẩm khỏi giỏ hàng
export const removeBasketItemAsync = createAsyncThunk<void, {productId: number, quantity: number, name?: string}> (
    'basket/removeBasketItemAsync',
    async ({productId, quantity}, thunkAPI) => {
        try {
            await agent.Basket.removeItem(productId, quantity)
        } catch (error : any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

export const basketSlice = createSlice({ // slice là một phần trạng thái của ứng dụng
    name: 'basket', // tên của slice
    initialState,
    reducers: {
        setBasket: (state, action) => {
            state.basket = action.payload // action.payload lấy dữ liệu từ initialState(trong này có các dữ liệu về Basket(giỏ hàng))
        }
    },
    extraReducers: (builder => {
        builder.addCase(addBasketItemAsync.pending, (state, action) => { // tác dụng của cái này là vào trạng thái đang chờ xử lý
            console.log(action);
            state.status = 'pendingAddItem' +  action.meta.arg.productId;
        });
        builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
            state.basket = action.payload;
            state.status = 'idle';
        });
        builder.addCase(addBasketItemAsync.rejected, (state, action) => {
            state.status = 'idle';
            console.log(action.payload);
        });
        builder.addCase(removeBasketItemAsync.pending, (state, action) => {
            state.status = 'pendingRemoveItem' + action.meta.arg.productId + action.meta.arg.name;
        });
        builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
            const {productId, quantity} = action.meta.arg;
            const itemIndex = state.basket?.items.findIndex(i => i.productId === productId); // tìm productId ở trong database bằng với productId của người tìm kiếm(click product) trên web bằng redux
            if (itemIndex === -1 || itemIndex === undefined) return;
            state.basket!.items[itemIndex].quantity -= quantity; // lấy nguyên mảng của itemIndex(gồm các danh sách số lượng product trong basket), trừ cho số lượng muốn trừ (basket có 8 , số lượng muốn trừ là 1, thì 8-1 = 7) 
            if (state.basket?.items[itemIndex].quantity === 0) {
                    state.basket.items.splice(itemIndex, 1); // splice() là để xóa một phần tử khỏi mảng items (nếu số lượng về 0, thì sẽ xóa luôn BasketItem khỏi giỏ hàng), và splice(itemIndex, 1) là xóa 1 phần tử
                }
            state.status = 'idle';
        });
        builder.addCase(removeBasketItemAsync.rejected, (state, action) => {
            state.status = 'idle';
            console.log(action.payload);
        });
    })
});

export const {setBasket} = basketSlice.actions;