using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SportsStore.Models
{
    public class Supplier
    {
        // Primary Key
        public long SupplierId { get; set; }

        // Regular properties
        public string Name { get; set; }
        public string City { get; set; }
        public string State { get; set; }

        // Navigation property
        public IEnumerable<Product> Products { get; set; }
    }
}
