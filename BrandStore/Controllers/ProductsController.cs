using BrandStore.Data;
using BrandStore.Entities;
using BrandStore.Extensions;
using BrandStore.RequestHelpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
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
        public async Task<ActionResult<PagedList<Product>>> GetAllProducts([FromQuery]ProductParams productParams) // và đây là sẽ trả ra 1 PagedList<T>, và <T> bây giờ sẽ chính là <Product>
        {
            var query = _context.Products
                .Sort(productParams.OrderBy) // gọi đến method Sort() của ProductExtentions
                .Search(productParams.SearchTerm)
                .Filter(productParams.Brands, productParams.Types)
                .AsQueryable();

            var products = await PagedList<Product>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);
            Response.AddPaginationHeader(products.MetaData);

            return products;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product =  await _context.Products.FindAsync(id);

            if(product == null) return NotFound();
            return product;
            
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilter()
        {
            var brands = await _context.Products.Select(p => p.Brand).Distinct().ToListAsync();
            var types = await _context.Products.Select(p => p.Type).Distinct().ToListAsync();

            return Ok(new {brands, types});
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
