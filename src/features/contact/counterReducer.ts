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

export function cong(amount = 1) {
    return {
        type: Cong,
        payload: amount
    }
}

export function tru(amount = 1) {
    return {
        type: Tru,
        payload: amount
    }
}

export default function counterReducer(state = initialState, action: any) {
    switch(action.type) {
        case Cong:
            return {
                ...state,
                data: state.data + action.payload
            }
        case Tru:
            return {
                ...state,
                data: state.data - action.payload
            }
        default:
            return state;
    }
}