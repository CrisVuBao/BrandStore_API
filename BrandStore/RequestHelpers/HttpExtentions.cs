using Microsoft.AspNetCore.Http;
using System.Text.Json;

namespace BrandStore.RequestHelpers
{
    public static class HttpExtentions
    {
        // method
        public static void AddPaginationHeader(this HttpResponse response, MetaData metaData)
        {
            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

            response.Headers.Add("Pagination", JsonSerializer.Serialize(metaData, options)); // phần này là chuyển các đối tượng, thuộc tính của metaData thành một chuỗi Json, sẽ hiện ra các thông tin của metaData 
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }
    }
}
