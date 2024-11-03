﻿using back_end.IRepository;
using back_end.Models;
using Microsoft.EntityFrameworkCore;
using MySqlX.XDevAPI.Common;
using System;

namespace back_end.Services
{
    public class ProductService : IProductRepo
    {
        private readonly ApplicationDbContext db;
        private readonly IWebHostEnvironment env;
        public ProductService(ApplicationDbContext db, IWebHostEnvironment env)
        {
            this.db = db;
            this.env = env;
        }


        public async Task<IEnumerable<Product>> GetAllProduct()
        {
            return await db.Products
                .Include(p => p.Category) // Kết nối với Category
                .Include(p => p.Colors) // Kết nối với Colors
                .Include(p => p.Sizes) // Kết nối với Sizes
                .Select(p => new Product()
                {
                    Id = p.Id,
                    NameProduct = p.NameProduct,
                    PriceProduct = p.PriceProduct,
                    StockQuantity = p.StockQuantity,
                    NumberOfProductSold = p.NumberOfProductSold,
                    NumberOfProductInStock = p.NumberOfProductInStock,
                    ImageProduct = p.ImageProduct,
                   /* ColorId = p.ColorId,*/
                    Colors = p.Colors, // Lấy Colors liên kết
                  /*  SizeId = p.SizeId,*/
                    Sizes = p.Sizes, // Lấy Sizes liên kết
                    Category = new Category() // Gán Category
                    {
                        Id = p.Category.Id,
                        Name = p.Category.Name,
                    }
                })
                .ToListAsync();
        }


        public async Task<bool> CreateProduct(Product product)
        {
            try
            {
                Category category = db.Categories.Where(c => c.Id == product.CategoryId).FirstOrDefault();
                product.Category = category;
                await db.Products.AddAsync(product);
                await db.SaveChangesAsync();
                if (product.ColorId != null)
                {
                    List<string> list = product.ColorId.Split(",").ToList();
                    for (int i = 0; i < list.Count; i++)
                    {
                        int id = Int32.Parse(list[i]);
                        ProductColor color = new ProductColor { ProductId = product.Id, ColorId = id };
                        db.ProductColors.Add(color);
                        await db.SaveChangesAsync();
                    }
                }
                if (product.SizeId != null)
                {
                    List<string> list = product.SizeId.Split(",").ToList();
                    for (int i = 0; i < list.Count; i++)
                    {
                        int id = Int32.Parse(list[i]);
                        ProductSize size = new ProductSize { ProductId = product.Id, SizeId = id };
                        db.ProductSizes.Add(size);
                        await db.SaveChangesAsync();
                    }
                }
                return true;

            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public async Task<IEnumerable<Product>> GetProductById(Guid Id)
        {
            return await db.Products.Include(c=>c.Category).Include(co=>co.Colors).Where(p=>p.Id == Id).Include(si=>si.Sizes).Where(p=>p.Id == Id).ToListAsync();
        }

        public async Task<bool> PutProduct(Guid Id, Product product)
        {
            var ExistingProduct = await db.Products.SingleOrDefaultAsync(p=>p.Id == Id);
            if (ExistingProduct != null)
            {
                Category category = db.Categories.Where(ca => ca.Id == product.CategoryId).FirstOrDefault();

                ExistingProduct.PriceProduct = product.PriceProduct;
                ExistingProduct.NameProduct = product.NameProduct;
                ExistingProduct.StockQuantity = product.StockQuantity;
                ExistingProduct.NumberOfProductSold = product.NumberOfProductSold;
                ExistingProduct.NumberOfProductInStock = product.NumberOfProductInStock;
                ExistingProduct.Category = category;

                var color = await db.ProductColors.Where(pc => pc.ProductId == Id).ToListAsync();
                foreach (var i in color)
                {   
                    db.ProductColors.Remove(i);
                    await db.SaveChangesAsync();
                }
                var ProductID = Id;
                if(product.ColorId != null)
                {
                    List<string> list = product.ColorId.Split(",").ToList();
                    for (int i = 0; i < list.Count; i++)
                    {
                        int id = Int32.Parse(list[i]);
                        ProductColor newColor = new ProductColor { ProductId = ProductID, ColorId = id };
                        db.ProductColors.Add(newColor);
                        await db.SaveChangesAsync();
                    }
                }
                var size = await db.ProductSizes.Where(pc => pc.ProductId == Id).ToListAsync();
                foreach (var i in size)
                {
                    db.ProductSizes.Remove(i);
                    await db.SaveChangesAsync();
                }
                if (product.SizeId != null)
                {
                    List<string> list = product.SizeId.Split(",").ToList();
                    for (int i = 0; i < list.Count; i++)
                    {
                        int id = Int32.Parse(list[i]);
                        ProductSize newSize = new ProductSize { ProductId = ProductID, SizeId = id };
                        db.ProductSizes.Add(newSize);
                        await db.SaveChangesAsync();
                    }
                }
                await db.SaveChangesAsync();
                return true;
            }
            else { return false; }
        }

        public async Task<Product> DeleteProduct(Guid Id)
        {
            var ExistingProduct = await db.Products.SingleOrDefaultAsync(p => p.Id == Id);
            if (ExistingProduct != null)
            {
                db.Products.Remove(ExistingProduct);
                int result = await db.SaveChangesAsync();
                if (result == 0)
                {
                    return null;
                }
                else
                {
                    return ExistingProduct;
                }
            }
            return null;
        }
    }
}
