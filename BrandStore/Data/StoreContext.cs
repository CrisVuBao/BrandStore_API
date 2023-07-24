using BrandStore.Entities;
using Microsoft.EntityFrameworkCore;

namespace BrandStore.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions options) : base(options)
        {

        }

        #region DbSet
        public DbSet<Product> Products { get; set; }
        #endregion
    }
}
