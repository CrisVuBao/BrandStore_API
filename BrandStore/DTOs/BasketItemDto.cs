namespace BrandStore.DTOs
{
    public class BasketItemDto
    {
        // hiện thông tin product trong giỏ hàng
        public int ProductId { get; set; } // lấy product theo Id của table Product
        public string Name { get; set; }
        public long Price { get; set; }
        public string PictureUrl { get; set; }
        public string Brand { get; set; }
        public string Type { get; set; }
        public int Quantity { get; set; }
    }
}