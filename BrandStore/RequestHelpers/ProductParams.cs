namespace BrandStore.RequestHelpers
{
    public class ProductParams : PaginationParams // khởi tạo thuộc tính truy vấn(query)
    {
        public string OrderBy { get; set; }
        public string SearchTerm { get; set; }
        public string Types { get; set; } 
        public string Brands { get; set; }
    }
}
