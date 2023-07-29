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

// khởi tạo ReduxThunk (để áp dụng async, await)
export const addBasketItemAsync = createAsyncThunk<Basket, {productId: number , quantity: number} > (
    'basket/addBasketItemAsync',
    async ({productId, quantity}) => {
        try {
            return await agent.Basket.addItem(productId, quantity);
        } catch(error) {
            console.log(error);
        }
    }
)

export const basketSlice = createSlice({ // slice là một phần trạng thái của ứng dụng
    name: 'basket', // tên của slice
    initialState,
    reducers: {
        setBasket: (state, action) => {
            state.basket = action.payload // action.payload lấy dữ liệu từ initialState(trong này có các dữ liệu về Basket(giỏ hàng))
        },
        removeItem: (state, action) => {
            const {productId, quantity} = action.payload;
            const itemIndex = state.basket?.items.findIndex(i => i.productId === productId); // tìm productId ở trong database bằng với productId của người tìm kiếm trên web bằng redux
            if (itemIndex === -1 || itemIndex === undefined) return;
            state.basket!.items[itemIndex].quantity -= quantity; // lấy nguyên mảng của itemIndex(gồm các danh sách số lượng product trong basket), trừ cho số lượng muốn trừ (basket có 8 , số lượng muốn trừ là 1, thì 8-1 = 7) 
            if (state.basket?.items[itemIndex].quantity === 0) {
                    state.basket.items.splice(itemIndex, 1); // splice() là để xóa một phần tử khỏi mảng items (nếu số lượng về 0, thì sẽ xóa luôn BasketItem khỏi giỏ hàng), và splice(itemIndex, 1) là xóa 1 phần tử
                }
        }

    },
    extraReducers: (builder => {
        builder.addCase(addBasketItemAsync.pending, (state, action) => { // tác dụng của cái này là vào trạng thái đang chờ xử lý
            console.log(action);
            state.status = 'pendingAddItem';
        });
        builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
            console.log(action);
            state.status = 'idle';
        });
        builder.addCase(addBasketItemAsync.rejected, (state, action) => {
            console.log(action);
            state.status = 'idle';
        });
    })
});

export const {setBasket, removeItem} = basketSlice.actions;