export interface Product {
    // các thuộc tính phải trùng với thuộc tính bên c#, viết hoa chữ đầu cũng ko dc
    id: number;
    name: string;
    description: string;
    price: number;
    pictureUrl: string;
    type?: string; // có thể null kiểu dáng
    brand: string;
    quantityInStock?: number; // có thể null số lượng
}

export interface ProductParams { // Interface Truy vấn sản phẩm
    orderBy: string;
    searchTerm?: string;
    types: string[];
    brands: string[];
    pageNumber: number;
    pageSize: number;
}