using BrandStore.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BrandStore.Data
{
    public class StoreContext : IdentityDbContext<User> 
    {
        public StoreContext(DbContextOptions options) : base(options)
        {

        }

        #region DbSet
        public DbSet<Product> Products { get; set; }
        public DbSet<Basket> Baskets { get; set; }
        #endregion

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<IdentityRole>()
                .HasData(
                    new IdentityRole { Name = "Member", NormalizedName = "MEMBER" },
                    new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" }
                );
        }
    }
}
