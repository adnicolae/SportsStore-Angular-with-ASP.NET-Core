using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SportsStore.Models
{
    public class Rating
    {
        // PK
        public long RatingId { get; set; }
        // regular prop
        public int Stars { get; set; }
        // navigation
        public Product Product { get; set; }
    }
}
