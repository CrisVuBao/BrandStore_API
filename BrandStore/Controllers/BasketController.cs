using BrandStore.Data;
using BrandStore.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
            var basket = await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);

            if (basket == null) return NotFound();

            return basket;
        }

        [HttpPost]
        public async Task<ActionResult> AddItemBasket(int productId, int quantity)
        {
            // get basket
            // create basket
            // get product
            // add item
            // save changes
            return StatusCode(201);
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            // get basket
            // remove item or reduce quantity
            // save changes
            return Ok();
        }
    }
}
