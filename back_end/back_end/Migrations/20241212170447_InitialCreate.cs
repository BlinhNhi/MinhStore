using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace back_end.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Colors",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Colors", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Sizes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    NumberOfSize = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sizes", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Name = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Email = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Password = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Phone = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Role = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    PriceProduct = table.Column<double>(type: "double", nullable: false),
                    NameProduct = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    StockQuantity = table.Column<int>(type: "int", nullable: false),
                    NumberOfProductSold = table.Column<int>(type: "int", nullable: false),
                    NumberOfProductInStock = table.Column<int>(type: "int", nullable: false),
                    ImagesProduct = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ColorId = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    SizeId = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CategoryId = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Products_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    TotalAmount = table.Column<int>(type: "int", nullable: false),
                    OrderDate = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orders_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ProductColors",
                columns: table => new
                {
                    ColorId = table.Column<int>(type: "int", nullable: false),
                    ProductId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductColors", x => new { x.ColorId, x.ProductId });
                    table.ForeignKey(
                        name: "FK_ProductColors_Colors_ColorId",
                        column: x => x.ColorId,
                        principalTable: "Colors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductColors_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ProductSizes",
                columns: table => new
                {
                    ProductId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    SizeId = table.Column<int>(type: "int", nullable: false),
                    Id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductSizes", x => new { x.SizeId, x.ProductId });
                    table.ForeignKey(
                        name: "FK_ProductSizes_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductSizes_Sizes_SizeId",
                        column: x => x.SizeId,
                        principalTable: "Sizes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "OrderDetails",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    ProductId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    OrderId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    QuantityOrder = table.Column<int>(type: "int", nullable: false),
                    SizeId = table.Column<int>(type: "int", nullable: false),
                    ColorId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderDetails_Colors_ColorId",
                        column: x => x.ColorId,
                        principalTable: "Colors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderDetails_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderDetails_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderDetails_Sizes_SizeId",
                        column: x => x.SizeId,
                        principalTable: "Sizes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Adidas" },
                    { 2, "Nike" },
                    { 3, "Puma" },
                    { 4, "Louis Vuitton" },
                    { 5, "Jordan" },
                    { 6, "Convert" },
                    { 7, "Canvas" }
                });

            migrationBuilder.InsertData(
                table: "Colors",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Xanh Navy" },
                    { 2, "Trắng Kem" },
                    { 3, "Xanh Rêu" },
                    { 4, "Cam" },
                    { 5, "Đen" },
                    { 6, "Hồng" },
                    { 7, "Nâu" },
                    { 8, "Xanh Dương" },
                    { 9, "Kem" },
                    { 10, "Hồng Kem" },
                    { 11, "Xanh Lá Cây" },
                    { 12, "Xanh Dương" },
                    { 13, "Xám" }
                });

            migrationBuilder.InsertData(
                table: "Sizes",
                columns: new[] { "Id", "NumberOfSize" },
                values: new object[,]
                {
                    { 1, "36" },
                    { 2, "37" },
                    { 3, "38" },
                    { 4, "39" },
                    { 5, "40" },
                    { 6, "41" },
                    { 7, "42" },
                    { 8, "43" },
                    { 9, "44" },
                    { 10, "45" },
                    { 11, "46" },
                    { 12, "47" },
                    { 13, "48" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "Name", "Password", "Phone", "Role" },
                values: new object[,]
                {
                    { new Guid("0679ce54-3dc9-477e-9bb4-8414d58a7185"), "user789@gmail.com", null, "$2a$11$WRXMQNMoPcYCKRTOuuXzsu9s.fhqrZmqXysOg6AfyNCAezy.caHlm", null, "User" },
                    { new Guid("94ba623f-adf6-4b41-9c66-1d56b6d17540"), "admin@minhstore.com", null, "$2a$11$meqohdjVv8pzF9/h0zK1KOkvI05tLkzfFVdv4e.4.Fd.khT1UK3Cu", null, "Admin" },
                    { new Guid("d6570847-bc26-4f82-9d88-c339b42282ae"), "user123@gmail.com", null, "$2a$11$iLdT4H/iXpTJTuFdT5u63.56mwQrSLPvp7f5P6Ske7R8yVn78.6Wm", null, "User" },
                    { new Guid("d9a50c44-a437-4898-9273-91a30c71fb7b"), "user456@gmail.com", null, "$2a$11$gFHTAeuwxr8P9oJqZTMVVe1UuLZ7P3bQSFLZ0Cjvfj.8tHo.ZzgAC", null, "User" }
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "CategoryId", "ColorId", "CreatedDate", "ImagesProduct", "NameProduct", "NumberOfProductInStock", "NumberOfProductSold", "PriceProduct", "SizeId", "StockQuantity" },
                values: new object[] { new Guid("01087e47-19aa-4ae9-8670-ee69d9223a02"), 1, "5,8,9,10", new DateTime(2024, 11, 17, 0, 0, 0, 0, DateTimeKind.Unspecified), "[\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731860256/gdw7lxyps83b8lb4e0dz.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731860258/r8zcqx920jtawfm9xdap.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731860259/jgjf7f9q5frtfogz2pap.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731860260/vw8c53g4pm8z5kfv6huc.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731860262/siexn3ygexvctydme2s6.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731860263/up71kjl9srrx5nhxp9g8.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731860265/y5wghhvrlc51qtpfgovm.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731860266/plkiqeg9qxzek1map7ei.jpg\"]", "Adidas Ultra Boost", 13, 1, 7000000.0, "3,4,5,6,7,8", 14 });

            migrationBuilder.InsertData(
                table: "ProductColors",
                columns: new[] { "ColorId", "ProductId", "Id" },
                values: new object[,]
                {
                    { 5, new Guid("01087e47-19aa-4ae9-8670-ee69d9223a02"), 1 },
                    { 8, new Guid("01087e47-19aa-4ae9-8670-ee69d9223a02"), 2 },
                    { 9, new Guid("01087e47-19aa-4ae9-8670-ee69d9223a02"), 3 },
                    { 10, new Guid("01087e47-19aa-4ae9-8670-ee69d9223a02"), 4 }
                });

            migrationBuilder.InsertData(
                table: "ProductSizes",
                columns: new[] { "ProductId", "SizeId", "Id" },
                values: new object[,]
                {
                    { new Guid("01087e47-19aa-4ae9-8670-ee69d9223a02"), 3, 1 },
                    { new Guid("01087e47-19aa-4ae9-8670-ee69d9223a02"), 4, 2 },
                    { new Guid("01087e47-19aa-4ae9-8670-ee69d9223a02"), 5, 3 },
                    { new Guid("01087e47-19aa-4ae9-8670-ee69d9223a02"), 6, 4 },
                    { new Guid("01087e47-19aa-4ae9-8670-ee69d9223a02"), 7, 5 },
                    { new Guid("01087e47-19aa-4ae9-8670-ee69d9223a02"), 8, 6 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetails_ColorId",
                table: "OrderDetails",
                column: "ColorId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetails_OrderId",
                table: "OrderDetails",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetails_ProductId",
                table: "OrderDetails",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetails_SizeId",
                table: "OrderDetails",
                column: "SizeId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_UserId",
                table: "Orders",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductColors_ProductId",
                table: "ProductColors",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_CategoryId",
                table: "Products",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductSizes_ProductId",
                table: "ProductSizes",
                column: "ProductId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderDetails");

            migrationBuilder.DropTable(
                name: "ProductColors");

            migrationBuilder.DropTable(
                name: "ProductSizes");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Colors");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Sizes");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Categories");
        }
    }
}
