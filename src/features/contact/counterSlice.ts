import { createSlice } from "@reduxjs/toolkit";
import { create } from "domain";

export interface CounterState {
    data: number;
    title: string;
}

const initialState: CounterState = {
    data: 100,
    title: 'Redux Export Counter'
}

// đây là theo phong cách xử lý của Redux
export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    // đây là reducer
    reducers: {
       cong: (state, action) => {
        state.data += action.payload // data = data + action.payload(là cái mình gắn vào trong hàm cong(1))
       },
       tru: (state, action) => {
        state.data -= action.payload // data = data - action.payload(là cái mình gắn vào trong hàm tru(2))
       }
    }
})

export const {cong, tru} = counterSlice.actions;