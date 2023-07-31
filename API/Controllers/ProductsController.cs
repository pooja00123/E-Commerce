using Infrastructure.Data;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Core.Interfaces;
using Core.Specifications;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IGenericRepository<Product> _productRepo;
    private readonly IGenericRepository<ProductBrand> _productBrandRepo;
    private readonly IGenericRepository<ProductType> _productTypeRepo;

    public ProductsController(IGenericRepository<Product> productRepo, 
        IGenericRepository<ProductBrand> productBrandRepo,
        IGenericRepository<ProductType> productTypeRepo)
    {
        _productRepo = productRepo;
        _productBrandRepo = productBrandRepo;
        _productTypeRepo = productTypeRepo;
    }

    //GET all products

    [HttpGet]
    //[Route("api/products")]
    public async Task<ActionResult<List<Product>>> GetProducts()
    {
        var spec = new ProductsWithTypesAndBrandsSpecification();
        var products = await _productRepo.ListAsync(spec);
        return Ok(products);
    }

    //Get product by Id
    [HttpGet]
    [Route("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
        var spec = new ProductsWithTypesAndBrandsSpecification(id);
        //return await _productRepo.GetByIdAsync(id);
        return await _productRepo.GetEntityWithspec(spec);
         
    }

    [HttpGet]
    [Route("brands")]

    public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
    {
        var brands = await _productBrandRepo.ListAllAsync();
        return Ok(brands);
    }

    [HttpGet]
    [Route("types")]

    public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
    {
        var types = await _productTypeRepo.ListAllAsync();
        return Ok(types);
    }




}