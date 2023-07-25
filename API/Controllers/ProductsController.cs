using Infrastructure.Data;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Core.Interfaces;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductRepository _repo;

    public ProductsController(IProductRepository repo)
    {
        _repo = repo;
    }

    //GET all products

    [HttpGet]
    //[Route("api/products")]
    public async Task<ActionResult<List<Product>>> GetProducts(){
        var products = await _repo.GetProductsAsync();
        return Ok(products);
    }

    //Get product by Id
    [HttpGet]
    [Route("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id){

        return await _repo.GetProductByIdAsync(id);
         
    }

    [HttpGet]
    [Route("brands")]

    public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
    { 
        var brands = await _repo.GetProductBrandsAsync();
        return Ok(brands);
    }

    [HttpGet]
    [Route("types")]

    public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
    {
        var types = await _repo.GetProductTypesAsync();
        return Ok(types);
    }




}