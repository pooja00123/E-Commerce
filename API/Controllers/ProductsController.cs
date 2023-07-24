using Infrastructure.Data;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    public StoreContext _context;
    public ProductsController(StoreContext context)
    {
        _context = context;
    }

    //GET all products

    [HttpGet]
    //[Route("api/products")]
    public async Task<ActionResult<List<Product>>> GetAllProducts(){
        var products = await _context.Products.ToListAsync();
        return products;
    }

    //Get product by Id
    [HttpGet]
    [Route("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id){

        var product = await _context.Products.FindAsync(id);
        return product;
    }




}