using Microsoft.EntityFrameworkCore;

namespace SportsStore.Models
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
    }
}
