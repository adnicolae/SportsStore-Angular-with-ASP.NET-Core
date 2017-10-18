using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SportsStore.Models;
using Microsoft.EntityFrameworkCore;

namespace SportsStore.Controllers
{
    [Produces("application/json")]
    [Route("api/products")]
    public class ProductValuesController : Controller
    {
        private DataContext _context;

        public ProductValuesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public Product GetProduct (long id)
        {
            Product result =  _context.Products
                .Include(p => p.Supplier)
                    .ThenInclude(s => s.Products)
                .Include(p => p.Ratings)
                .FirstOrDefault(p => p.ProductId == id);

            if (result != null)
            {
                if (result.Supplier != null)
                {
                    result.Supplier.Products = result.Supplier.Products.Select(p => new Product
                    {
                        ProductId = p.ProductId,
                        Name = p.Name,
                        Category = p.Category,
                        Description = p.Description,
                        Price = p.Price
                    });
                }
                if (result.Ratings != null)
                {
                    foreach (Rating r in result.Ratings)
                    {
                        r.Product = null;
                    }
                }
            }

            return result;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="related">indicate whether related data should be included in the response, which defaults to false</param>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<Product> GetProducts(bool related = false)
        {
            IQueryable<Product> query = _context.Products;

            // ToList forces execution of the query and ForEach is used to break circular dependencies
            if (related)
            {
                query = query
                    .Include(p => p.Supplier)
                    .Include(p => p.Ratings);

                List<Product> data = query.ToList();

                data.ForEach(p =>
                {
                    if (p.Supplier != null)
                    {
                        p.Supplier.Products = null;
                    }

                    if (p.Ratings != null)
                    {
                        p.Ratings
                        .ForEach(r => r.Product = null);
                    }
                });
                return data;
            }
            else
            {
                return query;
            }
        }
    }
}