using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SportsStore.Models.BindingTargets
{
    /// <summary>
    /// Details the Product object that should be created from a POST request.
    /// </summary>
    public class ProductData
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Category { get; set; }

        [Required]
        public string Description { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Price must be at least 1")]
        public decimal Price { get; set; }

        // the key of the supplier this product is associated with
        public long Supplier { get; set; }

        public Product Product => new Product
        {
            Name = Name,
            Category = Category,
            Description = Description,
            Price = Price,
            Supplier = Supplier == 0 ? null : new Models.Supplier { SupplierId = Supplier }
        };
    }
}
