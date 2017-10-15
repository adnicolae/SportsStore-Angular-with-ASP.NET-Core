using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SportsStore.Models
{
    public class Product
    {
        // Primary Key
        public long ProductId { get; set; }

        // Regular properties
        public string Name { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }

        // Navigation properties that EFCore uses to associate a Product object with other data in the database
        // related data
        // Each product may be related to one Supplier and multiple Ratings
        public Supplier Supplier { get; set; }
        public List<Rating> Ratings { get; set; }
    }
}
