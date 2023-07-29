import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Basket } from "../models/basket";

interface StoreContextValue {
    basket: Basket | null;
    setBasket: (basket: Basket) => void;
    removeItem: (productId: number, Quantity: number) => void;
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export function useStoreContext() {
    const context = useContext(StoreContext);

    if (context === undefined) {
        throw Error("Oop! - we do not seem inside the provider");
    }
    
    return context;
}

export function StoreProvider({children}: PropsWithChildren<any>) {
    const [basket, setBasket] = useState<Basket | null>(null);

    let removeItem = (productId: number, quantity: number) => {
        if (!basket) return;
        const items = [...basket.items]; // những thuộc tính như productId, name, price, quantity sẽ bằng biến const items
        const itemIndex = items.findIndex(i => i.productId == productId); // index của productId sẽ bằng với productId của hàm removeItem
        if(itemIndex >= 0) {
            items[itemIndex].quantity -= quantity; //lọc quantity theo productId, để biết là của product nào,  nếu quantity lớn hơn 0, thì sẽ cho phép trừ đi (quantity = quantity - quantity)
            if (items[itemIndex].quantity === 0) items.splice(itemIndex, 1); // nếu quantity của product đó  = 0, thì sẽ dùng method splice(itemIndex, 1) để xóa product theo productId
            setBasket(prevState => { // prevState là tham số , tham chiếu đến model Basket(giỏ hàng)
                return {...prevState!, items} // cập nhật lại trạng thái giỏ hàng, dấu ! là để truy cập vào trạng thái(state) trước đó
            })
        }
    }

    return (
        <StoreContext.Provider value={{basket, setBasket, removeItem}}>
            {children}
        </StoreContext.Provider>
    )
}
