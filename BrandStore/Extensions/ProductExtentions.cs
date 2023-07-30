using BrandStore.Data;
using BrandStore.Entities;
using System.Linq;

namespace BrandStore.Extensions
{
    public static class ProductExtentions
    {
        private static readonly StoreContext _context;

        public static IQueryable<Product> Sort(this IQueryable<Product> query, string orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy)) return query.OrderBy(p => p.Name); // trường hợp nếu không có thông tin để sắp xếp, thì ta sẽ sắp xếp theo theo "Name" mặc định

            query = orderBy switch
            {
                "price" => query.OrderBy(p => p.Price), // lọc theo giá bán tăng dần
                "priceDesc" => query.OrderByDescending(p => p.Price), // lọc theo giá bán giảm dần,
                _ => query.OrderBy(p => p.Name)
            };

            return query;
        }
    }
}
