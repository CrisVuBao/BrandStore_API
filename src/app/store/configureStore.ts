import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from '../../features/contact/counterSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { basketSlice } from '../../features/basket/basketSlice';
import { catalogSlice } from '../../features/catalog/catalogSlice';

// export function configureStore() {
//     return createStore(counterReducer) // tạo ra 1 cái createStore() để truyền dữ liệu từ counterReducer vào trong store, và rồi sẽ khởi tạo store bằng hàm của redux, và store là thằng quản lý toàn bộ dữ liệu
// }

export const store = configureStore({ // hàm configureStore của Redux Toolkit
        reducer: {
            counter: counterSlice.reducer, // đây là phần sẽ lấy các reducer cộng, trừ ném cho redux xử lý (chính xác là lấy data = data + 1, và data = data - 1 của bên slice)
            basket: basketSlice.reducer,
            catalog: catalogSlice.reducer
        } 
});

export type RootState = ReturnType<typeof store.getState>; // RootState đại diện cho trạng thái toàn bộ ứng dụng, và trong Redux store.
export type AppDispatch = typeof store.dispatch; // typeof store.dispatch được sử dụng để trích xuất kiểu dữ liệu của hàm dispatch trong Redux store.

export const useAppDispatch = () => useDispatch<AppDispatch>(); // sử dụng dữ liệu được gán vào trong dishpatch, (như data = 100, data = data + 1, ...  được gắn vào dishpatch của Redux store)
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// Như vậy, khi sử dụng các custom hook useAppDispatch và useAppSelector này, 
//bạn sẽ có lợi ích của việc đã định nghĩa các kiểu dữ liệu đại diện cho hàm dispatch và trạng thái toàn bộ ứng dụng,
//giúp giảm thiểu lỗi kiểu dữ liệu và cung cấp trải nghiệm phát triển tốt hơn khi làm việc với Redux trong ứng dụng React.