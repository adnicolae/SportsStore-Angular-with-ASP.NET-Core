using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SportsStore.Models;
using System.Linq;

namespace SportsStore.Controllers {
    public class HomeController : Controller {
        private DataContext _context;

        public HomeController(DataContext context)
        {
            _context = context;
        }

        public IActionResult Index() {
            ViewBag.Message = "Sports Store App";
            var model = _context.Products.First();
            return View(model);
        }
    }
}
