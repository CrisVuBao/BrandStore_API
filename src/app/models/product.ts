export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    pictureUrl: string;
    type?: string; // có thể null kiểu dáng
    brand: string;
    quantityInStock?: number; // có thể null số lượng
}