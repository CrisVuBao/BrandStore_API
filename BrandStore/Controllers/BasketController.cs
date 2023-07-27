using BrandStore.Data;
using BrandStore.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace BrandStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BasketController : ControllerBase
    {
        private readonly StoreContext _context; // biến này chỉ được gán một lần trong constructor và không thể thay đổi sau đó.

        // hàm khởi tạo này dùng để thực hiện các truy vấn cơ sở dữ liệu trong ứng dụng.
        public BasketController(StoreContext context) // tham số này dùng để truyền vào một đối tượng StoreContext, được sử dụng để tương tác với cơ sở dữ liệu.
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<Basket>> GetBasket()
        {
            var basket = await RetrieveBasket();

            if (basket == null) return NotFound();

            return basket;
        }

        [HttpPost]
        public async Task<ActionResult> AddItemBasket(int productId, int quantity)
        {
            // get basket
            var basket = await RetrieveBasket();
            // create basket
            if (basket == null) basket = CreateBasket(); // nếu giỏ hàng = null thì sẽ tạo ra 1 Guid buyerId, và được lưu trên cookies, và tạo ra 1 giỏ hàng mới theo buyerId đó || giải thích 2: Nếu giỏ hàng (basket) chưa tồn tại (null), phương thức sẽ gọi hàm CreateBasket() để tạo mới một giỏ hàng và gán giỏ hàng này cho biến basket. (giống như khi thêm product vào giỏ hàng rồi, nhưng lại quay ra trang chủ, thì giỏ hàng lại trở về null, và bấm vào Add Product thì lại thêm product vào giỏ hàng và rồi sẽ tạo ra giỏ hàng mới)
            // get product
            var product = await _context.Products.FindAsync(productId); // đoạn này là ném số id đã nhập vào trong productId vào trong class Product để dò tìm id sản phẩm
            if (product == null) return NotFound();
            // add item
            basket.AddItem(product, quantity); // chạy method AddItem của class Basket

            var result = await _context.SaveChangesAsync() > 0; // kiểm tra xem giá trị nếu có  > 0, thì đã có sự thay đổi ở CSDl(là ok)
            // save changes
            if (result) return Ok("Add Items OK");
            return BadRequest(new ProblemDetails { Title = "had problem add item in basket!!!"});
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            // get basket
            // remove item or reduce quantity
            // save changes
            return Ok();
        }

        // Đoạn code này được xây dựng để có thể các method get, post, put, delete dùng chung method này
        private async Task<Basket> RetrieveBasket()
        {
            return await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }

        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookiesOptions = new CookieOptions { IsEssential = true , Expires = DateTime.Now.AddDays(30)};
            Response.Cookies.Append("buyerId", buyerId, cookiesOptions);
            var basket = new Basket {BuyerId = buyerId}; // tạo mới 1 Basket , có BuyerId của class Basket =  với buyerId của Guid(id tạo ngẫu nhiên)
            _context.Baskets.Add(basket);
            return basket;
        }
    }
}
