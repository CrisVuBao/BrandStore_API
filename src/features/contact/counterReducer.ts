export interface CounterState {
    data: number;
    title: string;
}

const initialState: CounterState = {
    data: 100,
    title: 'Redux Export Counter'
}

export default function counterReducer(state = initialState, action: any) {
    return state; // export ra dữ liệu được tham chiếu trong inititalState
}