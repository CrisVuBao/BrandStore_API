using BrandStore.Data;
using BrandStore.Entities;
using System.Linq;

namespace BrandStore.Extensions
{
    public static class ProductExtentions
    {

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

        public static IQueryable<Product> Search(this IQueryable<Product> query, string searchTerm)
        {
            if (string.IsNullOrEmpty(searchTerm)) return query; // nếu ô input mà trống thì khi excute ra sẽ trả về danh sách product mặc định

            var lowerCaseSearchTerm = searchTerm.Trim().ToLower(); // chuẩn hóa tìm kiếm không phân biệt chữ hoa hay chữ thường, Trim():loại bỏ các khoảng trắng, toLower():chuyển thành chữ thường

            return query.Where(p => p.Name.ToLower().Contains(lowerCaseSearchTerm)); // Contranins(): kiểm tra xem đã được chuẩn hóa hay chưa, rồi return về kết quả
        }
    }
}
