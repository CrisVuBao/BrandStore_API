using System.Collections.Generic;
using System.Linq;

namespace BrandStore.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new(); // = new() là sẽ tạo ra một danh sách các mặt hàng khi ta tạo ra một giỏ hàng mới.
   
        public void AddItem(Product product, int quantityAdd)
        {
            if (Items.All(item => item.ProductId != product.Id))
            {
                // đoạn mã này kiểm tra xem sản phẩm với Id là product.Id có tồn tại trong giỏ hàng Items hay không. Nếu không tồn tại, nó sẽ thêm một mục mới đại diện cho sản phẩm đó vào giỏ hàng. Nếu sản phẩm đã tồn tại trong giỏ hàng, thì không có hành động gì thêm được thực hiện.
                // nếu ProductId của BasketItem không bằng Id của product, thì sẽ thêm product mới vào giỏ hàng
                Items.Add(new BasketItem { ProductId = product.Id, Quantity = quantityAdd });
            }

            var existingItem = Items.FirstOrDefault(item => item.ProductId == product.Id);
            if (existingItem != null) existingItem.Quantity += quantityAdd; // nếu sản phẩm tồn tại trong giỏ hàng(existingItem != null), thì chương trình sẽ cộng thêm số lượng mới (quantity) vào số lượng hiện có của mục sản phẩm (Quantity = Quantity + quantity)
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
