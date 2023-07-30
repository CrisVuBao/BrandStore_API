using System.Collections.Generic;
using System.Linq;

namespace BrandStore.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new(); // = new() là sẽ tạo ra một danh sách các mặt hàng khi ta tạo ra một giỏ hàng mới.
   
        public void AddItem(Product product, int quantity)
        {
            if (Items.All(item => item.ProductId != product.Id))
            {
                
                Items.Add(new BasketItem { Product = product, Quantity = quantity });
            }

            // đoạn code này là nếu đã có product trong basket, thì bấm vào add sẽ cộng dồn số lượng(Quantity) vào giỏ
            var existingItem = Items.FirstOrDefault(item => item.ProductId == product.Id);
            if (existingItem != null) existingItem.Quantity += quantity; // nếu sản phẩm đã tồn tại trong giỏ hàng(existingItem != null), thì chương trình sẽ cộng thêm số lượng mới (quantity) vào số lượng hiện có của mục sản phẩm (Quantity = Quantity + quantity)
        }

        public void RemoveItem(int productId, int quantity)
        {
            // đoạn code này là, nếu ko product trong giỏ hàng thì thôi luôn, nếu có thì trừ số lượng theo id, và nếu số lượng sản phẩm trong giỏ bằng 0 thì xóa product khỏi giỏ hàng. 
            var item = Items.FirstOrDefault(item => item.ProductId == productId);
            if (item == null) return;
            item.Quantity -= quantity;
            if(item.Quantity == 0) Items.Remove(item);
        }
    }
}
