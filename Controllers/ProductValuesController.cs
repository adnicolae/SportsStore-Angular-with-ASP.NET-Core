using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SportsStore.Models;
using Microsoft.EntityFrameworkCore;
using SportsStore.Models.BindingTargets;

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
        public IEnumerable<Product> GetProducts(string category, string search, bool related = false)
        {
            IQueryable<Product> query = _context.Products;

            if (!string.IsNullOrWhiteSpace(category))
            {
                string catLower = category.ToLower();

                query = query.Where(p => p.Category.ToLower().Contains(catLower));
            }

            if (!string.IsNullOrWhiteSpace(search))
            {
                string searchLower = search.ToLower();

                query = query.Where(p => p.Name.ToLower().Contains(searchLower));
            }

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

        /// <summary>
        /// FromBody tells the model binder to get the data values from the request body
        /// </summary>
        /// <param name="productData"></param>
        /// <returns>IActionResult allows data validation against the binder annotations, returns 400 if it doesn't validate</returns>
        [HttpPost]
        public IActionResult CreateProduct([FromBody] ProductData productData)
        {
            if (ModelState.IsValid)
            {
                Product p = productData.Product;

                if (p.Supplier != null && p.Supplier.SupplierId != 0)
                {
                    _context.Attach(p.Supplier);
                }
                _context.Add(p);
                _context.SaveChanges();
                return Ok(p.ProductId);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
    }
}