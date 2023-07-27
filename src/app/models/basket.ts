export interface BasketItem {
    // các thuộc tính phải trùng với thuộc tính bên c#, viết hoa chữ đầu cũng ko dc
    productId: number;
    name: string;
    price: number;
    pictureUrl: string;
    brand: string;
    type: string;
    quantity: number;
}

export interface Basket {
    // các thuộc tính phải trùng với thuộc tính bên c#, viết hoa chữ đầu cũng ko dc
    id: number;
    buyerId: string;
    items: BasketItem[];
}

