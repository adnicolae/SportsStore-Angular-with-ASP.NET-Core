using Microsoft.AspNetCore.Mvc;
using SportsStore.Models;
using SportsStore.Models.BindingTargets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SportsStore.Controllers
{
    [Route("api/suppliers")]
    public class SupplierValuesController : Controller
    {
        private DataContext _context;

        public SupplierValuesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Supplier> GetSuppliers()
        {
            return _context.Suppliers;
        }

        [HttpPost]
        public IActionResult CreateSupplier([FromBody] SupplierData supplierData)
        {
            if (ModelState.IsValid)
            {
                Supplier s = supplierData.Supplier;
                _context.Add(s);
                _context.SaveChanges();
                return Ok(s.SupplierId);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
    }
}
