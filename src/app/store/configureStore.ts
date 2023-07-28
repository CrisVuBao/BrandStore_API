import { createStore } from 'redux'
import counterReducer from "../../features/contact/counterReducer";

export function configureStore() {
    return createStore(counterReducer) // tạo ra 1 cái createStore() để truyền dữ liệu từ counterReducer vào trong store, và rồi sẽ khởi tạo store bằng hàm của redux, và store là thằng quản lý toàn bộ dữ liệu
}