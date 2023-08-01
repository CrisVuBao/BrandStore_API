using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BrandStore.RequestHelpers
{
    public class PagedList<T> : List<T> // PagedList<T>: T là kiểu chung, trường hợp này T là kiểu nào đó
    {
        // Field
        public MetaData MetaData { get; set; }

        // Contructor
        public PagedList(List<T> items, int count, int pageNumber, int pageSize)
        {
            MetaData = new MetaData // tạo một siêu dữ liệu mới
            {
                TotalCount = count,
                PageSize = pageSize,
                CurrentPage = pageNumber,
                TotalPages = (int)Math.Ceiling(count / (double)pageSize)
            };
            AddRange(items); // AddRange() là phương thức mà C# cung cấp cho List<T> để thêm được nhiều phần từ cùng lúc vào danh sách(List)
        }

        // method
        public static async Task<PagedList<T>> ToPagedList(IQueryable<T> query, int pageNumber, int pageSize)
        {
            var count = await query.CountAsync();
            var items = await query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync(); // vì index bắt đầu từ 0, nên phải trừ đi 1 đơn vị 0, để trang sẽ từ 1 -> trở đi
            return new PagedList<T>(items, count, pageNumber, pageSize); // khi truy vấn được từ sql, thì cuối cùng là trả ra một PageList mới gồm các thuộc tính đã được tính toán, phân chia trang
        }
    }
}
