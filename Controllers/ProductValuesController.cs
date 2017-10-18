using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SportsStore.Models;

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
            System.Threading.Thread.Sleep(50000);
            return _context.Products.Find(id);
        }
    }
}