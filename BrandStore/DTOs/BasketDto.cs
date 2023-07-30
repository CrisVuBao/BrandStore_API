using System.Collections.Generic;

namespace BrandStore.DTOs
{
    public class BasketDto
    {
        // cho biết rằng giỏ hàng này là của ai(của buyer nào)
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItemDto> Items { get; set; }
    }
}
