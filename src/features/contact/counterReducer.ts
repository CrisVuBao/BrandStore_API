export const Cong = "Cong";
export const Tru = "Tru";

export interface CounterState {
    data: number;
    title: string;
}

const initialState: CounterState = {
    data: 100,
    title: 'Redux Export Counter'
}

export default function counterReducer(state = initialState, action: any) {
    switch(action.type) {
        case Cong:
            return {
                ...state,
                data: state.data + 1
            }
        case Tru:
            return {
                ...state,
                data: state.data - 1   
            }
        default:
            return state;
    }
}