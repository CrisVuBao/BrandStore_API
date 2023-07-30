using BrandStore.Data;
using BrandStore.Entities;
using BrandStore.Extensions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BrandStore.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly StoreContext _context;

        public ProductsController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet] // lấy full product
        public async Task<ActionResult<List<Product>>> GetAllProducts(string orderBy, string searchTerm) 
        {
            var query = _context.Products
                .Sort(orderBy) // gọi đến method Sort() của ProductExtentions
                .Search(searchTerm)
                .AsQueryable();



            return await query.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product =  await _context.Products.FindAsync(id);

            if(product == null) return NotFound();
            return product;
            
        }

        [HttpPost]
        public async Task<ActionResult<Product>> AddProduct(Product product)
        {
                var addProduct = new Product
                {
                    Name = product.Name,
                    Description = product.Description,
                    Price = product.Price,
                    PictureUrl = product.PictureUrl,
                    Type = product.Type,
                    Brand = product.Brand,
                    QuantityInStock = product.QuantityInStock
                };

                var resultAdd = await _context.Products.AddAsync(addProduct);
                return Ok(resultAdd);
        }      
    }
}
