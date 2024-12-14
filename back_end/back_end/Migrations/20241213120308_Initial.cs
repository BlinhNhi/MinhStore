using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace back_end.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
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
                    { new Guid("0afd73e7-ff97-4496-a3e4-982bed3d13dd"), "admin@minhstore.com", null, "$2a$11$9jeUlXPVD7r1nCM2OY8kTeTb0gaaqU9JNxvDlLdnAfCsTqshtVjJq", null, "Admin" },
                    { new Guid("78f30dbe-4dcf-42c9-a218-3d938ca79c8e"), "user456@gmail.com", null, "$2a$11$O88Jm0AY8nWbPaggG4s4yO4k3p1ksK5KCdk/5KVTShM70NVPeY1Wq", null, "User" },
                    { new Guid("c8b55424-7f37-4d0e-8ee6-7ff3ccfabac1"), "user789@gmail.com", null, "$2a$11$c6SU5E8zS/3ZHPBlTX6OK.hXUJMjd4zDyUf2WhnFY1Z1fnJ8e57Py", null, "User" },
                    { new Guid("ff4ea765-a65d-40ab-9a80-e34a9f88641b"), "user123@gmail.com", null, "$2a$11$FCaTTf3BWwO71.0jEje/Z.J3CWJO/1iYcT9eNWj/qcmEOhR7.SlJO", null, "User" }
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "CategoryId", "ColorId", "CreatedDate", "ImagesProduct", "NameProduct", "NumberOfProductInStock", "NumberOfProductSold", "PriceProduct", "SizeId", "StockQuantity" },
                values: new object[,]
                {
                    { new Guid("01087e47-19aa-4ae9-8670-ee69d9223a02"), 1, "5,8,9,10", new DateTime(2024, 11, 17, 0, 0, 0, 0, DateTimeKind.Unspecified), "[\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731860256/gdw7lxyps83b8lb4e0dz.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731860258/r8zcqx920jtawfm9xdap.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731860259/jgjf7f9q5frtfogz2pap.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731860260/vw8c53g4pm8z5kfv6huc.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731860262/siexn3ygexvctydme2s6.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731860263/up71kjl9srrx5nhxp9g8.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731860265/y5wghhvrlc51qtpfgovm.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731860266/plkiqeg9qxzek1map7ei.jpg\"]", "Adidas Ultra Boost", 13, 1, 7000000.0, "3,4,5,6,7,8", 14 },
                    { new Guid("07401f68-4576-4079-adc4-dd650f677fd3"), 2, "12", new DateTime(2024, 11, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), "[\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731433880/ugcuzwogxefgvn3cmaxv.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731433882/qea967cokcdtzqjkivux.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731433884/czcq9j9k1fhr810qa5ij.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731433885/ti9mfqkp8rtboqjxhmmp.jpg\"]", "Nike Air", 12, 0, 1400000.0, "4,5,6,7", 12 },
                    { new Guid("0b7eeadd-9b05-4083-a1d9-ab92f3df285c"), 1, "6,10", new DateTime(2024, 11, 17, 0, 0, 0, 0, DateTimeKind.Unspecified), "[\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731859640/rhkr5efguhfbjvy00qhl.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731859644/bdkk7vxzqyotxk7fedam.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731859647/mmomwunxbz1ocymymwsa.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731859651/vpc7tzzamfpedd44kjfx.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731859656/y4qzzm6krkescndmmedh.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731859661/bvll2vngzgghefdfhetv.jpg\"]", "Adidas Gazelle", 1, 11, 2000000.0, "2,3,4,5", 12 },
                    { new Guid("39978fd8-a449-47b6-b8ed-0e3461a20073"), 1, "1,10", new DateTime(2024, 11, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), "[\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731471164/rqlsoym0u01xndkw2khx.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731471173/mfvli39fscfnbvrrln9u.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731471174/zymzqi1prwvcyrkq8xdr.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731471175/xc2qo01mwm2qvbbsnm9t.jpg\"]", "ADIDAS CAMPUS", 4, 0, 850000.0, "1,2,3,4,5", 4 },
                    { new Guid("52623100-c0e1-460a-9bca-5dfe2592f9cf"), 1, "3,6,8", new DateTime(2024, 11, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), "[\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731432334/d7i7cnsq7mv1gdrjmugr.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731432335/eeons2zvfiybtlyz33im.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731432337/jqxmjxl4zwcgnde4qn3m.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731432338/y54prw6hqexa44mkszmd.jpg\"]", "Adidas Campus", 5, 0, 500000.0, "2,3,5,6,7", 5 }
                });

            migrationBuilder.InsertData(
                table: "ProductColors",
                columns: new[] { "ColorId", "ProductId", "Id" },
                values: new object[,]
                {
                    { 1, new Guid("39978fd8-a449-47b6-b8ed-0e3461a20073"), 8 },
                    { 3, new Guid("52623100-c0e1-460a-9bca-5dfe2592f9cf"), 10 },
                    { 5, new Guid("01087e47-19aa-4ae9-8670-ee69d9223a02"), 1 },
                    { 6, new Guid("0b7eeadd-9b05-4083-a1d9-ab92f3df285c"), 6 },
                    { 6, new Guid("52623100-c0e1-460a-9bca-5dfe2592f9cf"), 11 },
                    { 8, new Guid("01087e47-19aa-4ae9-8670-ee69d9223a02"), 2 },
                    { 8, new Guid("52623100-c0e1-460a-9bca-5dfe2592f9cf"), 12 },
                    { 9, new Guid("01087e47-19aa-4ae9-8670-ee69d9223a02"), 3 },
                    { 10, new Guid("01087e47-19aa-4ae9-8670-ee69d9223a02"), 4 },
                    { 10, new Guid("0b7eeadd-9b05-4083-a1d9-ab92f3df285c"), 7 },
                    { 10, new Guid("39978fd8-a449-47b6-b8ed-0e3461a20073"), 9 },
                    { 12, new Guid("07401f68-4576-4079-adc4-dd650f677fd3"), 5 }
                });

            migrationBuilder.InsertData(
                table: "ProductSizes",
                columns: new[] { "ProductId", "SizeId", "Id" },
                values: new object[,]
                {
                    { new Guid("39978fd8-a449-47b6-b8ed-0e3461a20073"), 1, 15 },
                    { new Guid("0b7eeadd-9b05-4083-a1d9-ab92f3df285c"), 2, 11 },
                    { new Guid("39978fd8-a449-47b6-b8ed-0e3461a20073"), 2, 16 },
                    { new Guid("52623100-c0e1-460a-9bca-5dfe2592f9cf"), 2, 20 },
                    { new Guid("01087e47-19aa-4ae9-8670-ee69d9223a02"), 3, 1 },
                    { new Guid("0b7eeadd-9b05-4083-a1d9-ab92f3df285c"), 3, 12 },
                    { new Guid("39978fd8-a449-47b6-b8ed-0e3461a20073"), 3, 17 },
                    { new Guid("52623100-c0e1-460a-9bca-5dfe2592f9cf"), 3, 21 },
                    { new Guid("01087e47-19aa-4ae9-8670-ee69d9223a02"), 4, 2 },
                    { new Guid("07401f68-4576-4079-adc4-dd650f677fd3"), 4, 7 },
                    { new Guid("0b7eeadd-9b05-4083-a1d9-ab92f3df285c"), 4, 13 },
                    { new Guid("39978fd8-a449-47b6-b8ed-0e3461a20073"), 4, 18 },
                    { new Guid("01087e47-19aa-4ae9-8670-ee69d9223a02"), 5, 3 },
                    { new Guid("07401f68-4576-4079-adc4-dd650f677fd3"), 5, 8 },
                    { new Guid("0b7eeadd-9b05-4083-a1d9-ab92f3df285c"), 5, 14 },
                    { new Guid("39978fd8-a449-47b6-b8ed-0e3461a20073"), 5, 19 },
                    { new Guid("52623100-c0e1-460a-9bca-5dfe2592f9cf"), 5, 22 },
                    { new Guid("01087e47-19aa-4ae9-8670-ee69d9223a02"), 6, 4 },
                    { new Guid("07401f68-4576-4079-adc4-dd650f677fd3"), 6, 9 },
                    { new Guid("52623100-c0e1-460a-9bca-5dfe2592f9cf"), 6, 23 },
                    { new Guid("01087e47-19aa-4ae9-8670-ee69d9223a02"), 7, 5 },
                    { new Guid("07401f68-4576-4079-adc4-dd650f677fd3"), 7, 10 },
                    { new Guid("52623100-c0e1-460a-9bca-5dfe2592f9cf"), 7, 24 },
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
