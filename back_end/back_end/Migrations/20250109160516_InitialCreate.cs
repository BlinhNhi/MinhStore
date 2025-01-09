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
                    GoogleId = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
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
                    ProductId = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    QuantityOrder = table.Column<int>(type: "int", nullable: false),
                    TotalAmount = table.Column<int>(type: "int", nullable: false),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    SizeId = table.Column<int>(type: "int", nullable: false),
                    ColorId = table.Column<int>(type: "int", nullable: false),
                    OrderDate = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orders_Colors_ColorId",
                        column: x => x.ColorId,
                        principalTable: "Colors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Orders_Sizes_SizeId",
                        column: x => x.SizeId,
                        principalTable: "Sizes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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
                name: "OrderProduct",
                columns: table => new
                {
                    OrdersId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    ProductsId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderProduct", x => new { x.OrdersId, x.ProductsId });
                    table.ForeignKey(
                        name: "FK_OrderProduct_Orders_OrdersId",
                        column: x => x.OrdersId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderProduct_Products_ProductsId",
                        column: x => x.ProductsId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "OrderProducts",
                columns: table => new
                {
                    ProductId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    OrderId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderProducts", x => new { x.ProductId, x.OrderId });
                    table.ForeignKey(
                        name: "FK_OrderProducts_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderProducts_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
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
                columns: new[] { "Id", "Email", "GoogleId", "Name", "Password", "Phone", "Role" },
                values: new object[,]
                {
                    { new Guid("55b33dea-de32-450f-b460-ac2a95391dd2"), "user789@gmail.com", null, null, "$2a$11$F7hvjHtjjPVfpjXLsXhrRuLZRQOnShWCntp2XFulKn18QoeX1PO/O", null, "User" },
                    { new Guid("5d83a7bd-e367-4c28-a3f8-a66bdccd4031"), "admin@minhstore.com", null, null, "$2a$11$dETphQVeoJfMxoeR5fBW/ukn37M894YaG10/dl9oSsYcFGIUSYRCG", null, "Admin" },
                    { new Guid("884790c5-eca8-4eb8-8ff4-956c6a466839"), "user123@gmail.com", null, null, "$2a$11$i/PJLhmxk.072z/hgpjKBOgIHKbCOFRGQe2pNN2eIbpdmRFphte.2", null, "User" },
                    { new Guid("a4ade3d9-b47c-4fc9-8760-91771fd6282c"), "user456@gmail.com", null, null, "$2a$11$hiWEHICPeypCy5WMX9O0Su.npaOiWUPD.B6mvcKMbjEgfbc3qXwMe", null, "User" }
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
                    { new Guid("52623100-c0e1-460a-9bca-5dfe2592f9cf"), 1, "3,6,8", new DateTime(2024, 11, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), "[\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731432334/d7i7cnsq7mv1gdrjmugr.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731432335/eeons2zvfiybtlyz33im.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731432337/jqxmjxl4zwcgnde4qn3m.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731432338/y54prw6hqexa44mkszmd.jpg\"]", "Adidas Campus", 5, 0, 500000.0, "2,3,5,6,7", 5 },
                    { new Guid("55b9e08d-d622-47ea-b341-bad40def946d"), 3, "4,5", new DateTime(2024, 11, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), "[\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731432710/wnfwakudnx1gkxrawfmb.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731432711/zh56cwiejbrvoufhlbp0.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731432713/nhngkgrsxjeydde3e2dg.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731432715/xsbpiwnbq8wvu3bv9fz5.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731432717/i9x1vhosn0iahsjxvxf5.jpg\"]", "Puma Palermo", 22, 0, 800000.0, "1,2,3,4,5", 22 },
                    { new Guid("6c8e2d97-0c60-4812-acd8-868a1affbd73"), 5, "3,5,9", new DateTime(2024, 11, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), "[\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731430487/baxfbq5wxh73ba8ksfaz.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731430488/p8uyela927w1rrag5daz.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731430490/bweeimljvsq9nahitxdj.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731430492/yup6bo5wwq7upacek42g.jpg\"]", "Air Jodan 1 Low", 10, 0, 2000000.0, "1,2,3,5,6,7,10,11", 10 },
                    { new Guid("71b39c26-230a-4331-a448-c6144cf99e7f"), 7, "5,8", new DateTime(2024, 11, 18, 0, 0, 0, 0, DateTimeKind.Unspecified), "[\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731944435/wjw8p7zrnentqxyxpg7i.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731944437/grp1bkdb355a7mjaewpo.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731944439/ktzhplublfk8ffwu7qlm.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731944441/wurk5wzjg6txhhi6c2cu.jpg\"]", "Canvas Dior", 12, 0, 650000.0, "1,2,3,4,5", 12 },
                    { new Guid("7cd6924c-8938-4530-857a-3055efb9311a"), 2, "8", new DateTime(2024, 11, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), "[\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731434187/bvmbamq8i5jnyzlex4ok.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731434188/gvs9u9nphocrymduzsch.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731434190/i2g85hhfhhmqjnujinjh.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731434191/vhwwqb6hbnjih1cvwhmk.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731434193/vpvobcuxnroxjdvnoozw.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731434195/lytavcwpf1ndsvbhz5fg.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731434197/asfqgrn7bvcuhbyxwksx.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731434240/bw6u7pr8qprgpygn1clw.jpg\"]", "Nike Ambush", 10, 0, 550000.0, "3,4,5", 10 },
                    { new Guid("89dafb16-28e7-4fa9-b66d-ca8b944db261"), 1, "5,8,9", new DateTime(2024, 11, 18, 0, 0, 0, 0, DateTimeKind.Unspecified), "[\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731943617/qp9lbv7hikc1b8etjmfd.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731943619/rmpc1cpv0obz10qya9e5.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731943620/nugy6nrxnyd53cisoqu9.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731943622/kuu0ouojbl2s86xrej4z.jpg\"]", "Das Forum", 1, 10, 500000.0, "1,2,3,4,5", 11 },
                    { new Guid("8cb945b1-c6ab-4237-8501-0e05f4e6aa83"), 1, "1,8", new DateTime(2024, 11, 18, 0, 0, 0, 0, DateTimeKind.Unspecified), "[\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731943316/mg7okl4p0ho3flf0aij6.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731943318/bevh62cqkbfvfefy3yiw.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731943319/klg1sjqmwexksgdjm2rc.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731943320/liqkku5o3jet5r6r9i10.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731943322/hpynvffgljkon1y94def.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731943324/p8gpocvxi2pedr5wqf8t.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731943326/zihadouejlkzy6zq933t.jpg\"]", "Adidas Alpha", 11, 1, 650000.0, "1,2,3,4,5,6,7,8,9,10", 12 },
                    { new Guid("b03034a9-9058-4a83-b146-92ba1a217c83"), 2, "8", new DateTime(2024, 11, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), "[\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731433416/njmytm96ofmcy3m5diz1.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731433418/jcdo0d7nt2cgcwut2p1v.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731433419/v1efwnk2o4rdiebsmfbl.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731433421/xgsybb6tqnyh3pkdisgr.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731433424/mwf1uazdpmrqdkgleyqc.jpg\"]", "Nike Air", 1, 10, 450000.0, "4,5,6,7", 11 },
                    { new Guid("b5ac0163-7d9d-43b4-a980-44e42e4999ed"), 4, "2,8", new DateTime(2024, 11, 18, 0, 0, 0, 0, DateTimeKind.Unspecified), "[\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731432512/tdvin5qdfzkxuvfrssf0.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731432512/bdrxvn72husd3aitwo3l.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731432515/ped6cv3hdhhz9dhvlcph.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731432518/mslkogbmji0tf1tb8fmh.jpg\"]", "Louis Vuitton", 12, 0, 600000.0, "1,2,3,4,5", 12 },
                    { new Guid("bb1da4ee-31df-4fb6-916a-1548acfdc111"), 1, "8", new DateTime(2024, 11, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), "[\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731431053/eiymsdxcr6xmzsctyxsl.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731431054/nbkwevvk843qi1is2d1l.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731431057/oxhxqy6xjeijaeznmwfb.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731431060/bdziz0fqjqpp5v0wuehv.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731431061/dfnbpiiaht0czzvhkwgs.jpg\"]", "Adidas Samba", 3, 0, 3000000.0, "1,2,3,4,5,6,7,8", 3 },
                    { new Guid("c76f49c6-01dc-437d-a9a6-7c90c4e03b48"), 2, "5,6,8,9,11", new DateTime(2024, 11, 18, 0, 0, 0, 0, DateTimeKind.Unspecified), "[\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731943872/np2qxwmdrayheja2wmpu.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731943873/qtgu1pj3608iqlbouwe2.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731943875/bneqbpyl1zh8ybq4jvwe.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731943876/nwwcqwy50u2j7nzz1muq.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731943878/o2yslhhho8jfxfjivu2x.jpg\"]", "Nike Dunk Disrupt", 1, 11, 545000.0, "1,2,3,4,5,6", 12 },
                    { new Guid("ccfde94d-62dc-4ec7-8538-c800e00c280d"), 7, "5,8", new DateTime(2024, 11, 18, 0, 0, 0, 0, DateTimeKind.Unspecified), "[\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731944435/wjw8p7zrnentqxyxpg7i.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731944437/grp1bkdb355a7mjaewpo.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731944439/ktzhplublfk8ffwu7qlm.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731944441/wurk5wzjg6txhhi6c2cu.jpg\"]", "Canvas Dior", 12, 0, 650000.0, "1,2,3,4,5", 12 },
                    { new Guid("d3c4f6cf-a03c-4c1f-bc4b-52f2d1aaf228"), 1, "1,3,8", new DateTime(2024, 11, 17, 0, 0, 0, 0, DateTimeKind.Unspecified), "[\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731858657/zllbwaptnt7fuiinusdf.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731858660/kw4egljw50a3yszyfapq.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731858665/al7iyu25mil7hba14lzh.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731858672/upwl5awzbyxqv86dwltc.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731858681/qldlsqaimfegakativxn.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731858697/o8vi7c0g2eaagmabfjfr.jpg\"]", "Adidas Samba", 12, 0, 10000000.0, "4,5,6,7,8", 12 },
                    { new Guid("e0f75a82-e1f0-40de-bd43-57ce0c1d52b7"), 1, "7,8", new DateTime(2024, 11, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), "[\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731433697/b5vuk9pvjvipb5ibdbyn.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731433698/xliqlbzhzfjggfbszlr4.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731433700/cdpbqpd5pgq5yhux5ygb.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731433703/zwpiuvpwewdzppnzl5zc.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731433706/mlintliclffz7aju8ppv.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731433707/bdpgu7gnwbt5awn3e8wm.jpg\"]", "Adidas Samba", 3, 0, 4000000.0, "1,2,3,4,5,6,7", 3 },
                    { new Guid("ecc825cb-9cce-4597-9369-a9e543700d26"), 1, "5,8", new DateTime(2024, 11, 18, 0, 0, 0, 0, DateTimeKind.Unspecified), "[\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731943980/favoyvs9rulabglyk0iu.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731943981/tcdiqa1jxy5js6fbyph7.jpg\"]", "Adidas SupperStar", 1, 9, 2000000.0, "1,2,3,4,5", 10 }
                });

            migrationBuilder.InsertData(
                table: "ProductColors",
                columns: new[] { "ColorId", "ProductId", "Id" },
                values: new object[,]
                {
                    { 1, new Guid("39978fd8-a449-47b6-b8ed-0e3461a20073"), 8 },
                    { 1, new Guid("8cb945b1-c6ab-4237-8501-0e05f4e6aa83"), 24 },
                    { 1, new Guid("d3c4f6cf-a03c-4c1f-bc4b-52f2d1aaf228"), 33 },
                    { 2, new Guid("b5ac0163-7d9d-43b4-a980-44e42e4999ed"), 27 },
                    { 3, new Guid("52623100-c0e1-460a-9bca-5dfe2592f9cf"), 10 },
                    { 3, new Guid("6c8e2d97-0c60-4812-acd8-868a1affbd73"), 15 },
                    { 3, new Guid("d3c4f6cf-a03c-4c1f-bc4b-52f2d1aaf228"), 34 },
                    { 4, new Guid("55b9e08d-d622-47ea-b341-bad40def946d"), 13 },
                    { 5, new Guid("01087e47-19aa-4ae9-8670-ee69d9223a02"), 1 },
                    { 5, new Guid("55b9e08d-d622-47ea-b341-bad40def946d"), 14 },
                    { 5, new Guid("6c8e2d97-0c60-4812-acd8-868a1affbd73"), 16 },
                    { 5, new Guid("71b39c26-230a-4331-a448-c6144cf99e7f"), 18 },
                    { 5, new Guid("89dafb16-28e7-4fa9-b66d-ca8b944db261"), 22 },
                    { 5, new Guid("c76f49c6-01dc-437d-a9a6-7c90c4e03b48"), 39 },
                    { 5, new Guid("ccfde94d-62dc-4ec7-8538-c800e00c280d"), 30 },
                    { 5, new Guid("ecc825cb-9cce-4597-9369-a9e543700d26"), 35 },
                    { 6, new Guid("0b7eeadd-9b05-4083-a1d9-ab92f3df285c"), 6 },
                    { 6, new Guid("52623100-c0e1-460a-9bca-5dfe2592f9cf"), 11 },
                    { 6, new Guid("c76f49c6-01dc-437d-a9a6-7c90c4e03b48"), 40 },
                    { 7, new Guid("e0f75a82-e1f0-40de-bd43-57ce0c1d52b7"), 37 },
                    { 8, new Guid("01087e47-19aa-4ae9-8670-ee69d9223a02"), 2 },
                    { 8, new Guid("52623100-c0e1-460a-9bca-5dfe2592f9cf"), 12 },
                    { 8, new Guid("71b39c26-230a-4331-a448-c6144cf99e7f"), 19 },
                    { 8, new Guid("7cd6924c-8938-4530-857a-3055efb9311a"), 20 },
                    { 8, new Guid("89dafb16-28e7-4fa9-b66d-ca8b944db261"), 21 },
                    { 8, new Guid("8cb945b1-c6ab-4237-8501-0e05f4e6aa83"), 25 },
                    { 8, new Guid("b03034a9-9058-4a83-b146-92ba1a217c83"), 26 },
                    { 8, new Guid("b5ac0163-7d9d-43b4-a980-44e42e4999ed"), 28 },
                    { 8, new Guid("bb1da4ee-31df-4fb6-916a-1548acfdc111"), 29 },
                    { 8, new Guid("c76f49c6-01dc-437d-a9a6-7c90c4e03b48"), 41 },
                    { 8, new Guid("ccfde94d-62dc-4ec7-8538-c800e00c280d"), 31 },
                    { 8, new Guid("d3c4f6cf-a03c-4c1f-bc4b-52f2d1aaf228"), 32 },
                    { 8, new Guid("e0f75a82-e1f0-40de-bd43-57ce0c1d52b7"), 38 },
                    { 8, new Guid("ecc825cb-9cce-4597-9369-a9e543700d26"), 36 },
                    { 9, new Guid("01087e47-19aa-4ae9-8670-ee69d9223a02"), 3 },
                    { 9, new Guid("6c8e2d97-0c60-4812-acd8-868a1affbd73"), 17 },
                    { 9, new Guid("89dafb16-28e7-4fa9-b66d-ca8b944db261"), 23 },
                    { 9, new Guid("c76f49c6-01dc-437d-a9a6-7c90c4e03b48"), 42 },
                    { 10, new Guid("01087e47-19aa-4ae9-8670-ee69d9223a02"), 4 },
                    { 10, new Guid("0b7eeadd-9b05-4083-a1d9-ab92f3df285c"), 7 },
                    { 10, new Guid("39978fd8-a449-47b6-b8ed-0e3461a20073"), 9 },
                    { 11, new Guid("c76f49c6-01dc-437d-a9a6-7c90c4e03b48"), 43 },
                    { 12, new Guid("07401f68-4576-4079-adc4-dd650f677fd3"), 5 }
                });

            migrationBuilder.InsertData(
                table: "ProductSizes",
                columns: new[] { "ProductId", "SizeId", "Id" },
                values: new object[,]
                {
                    { new Guid("39978fd8-a449-47b6-b8ed-0e3461a20073"), 1, 15 },
                    { new Guid("55b9e08d-d622-47ea-b341-bad40def946d"), 1, 25 },
                    { new Guid("6c8e2d97-0c60-4812-acd8-868a1affbd73"), 1, 30 },
                    { new Guid("71b39c26-230a-4331-a448-c6144cf99e7f"), 1, 39 },
                    { new Guid("89dafb16-28e7-4fa9-b66d-ca8b944db261"), 1, 47 },
                    { new Guid("8cb945b1-c6ab-4237-8501-0e05f4e6aa83"), 1, 52 },
                    { new Guid("b5ac0163-7d9d-43b4-a980-44e42e4999ed"), 1, 66 },
                    { new Guid("bb1da4ee-31df-4fb6-916a-1548acfdc111"), 1, 71 },
                    { new Guid("c76f49c6-01dc-437d-a9a6-7c90c4e03b48"), 1, 101 },
                    { new Guid("ccfde94d-62dc-4ec7-8538-c800e00c280d"), 1, 79 },
                    { new Guid("e0f75a82-e1f0-40de-bd43-57ce0c1d52b7"), 1, 94 },
                    { new Guid("ecc825cb-9cce-4597-9369-a9e543700d26"), 1, 89 },
                    { new Guid("0b7eeadd-9b05-4083-a1d9-ab92f3df285c"), 2, 11 },
                    { new Guid("39978fd8-a449-47b6-b8ed-0e3461a20073"), 2, 16 },
                    { new Guid("52623100-c0e1-460a-9bca-5dfe2592f9cf"), 2, 20 },
                    { new Guid("55b9e08d-d622-47ea-b341-bad40def946d"), 2, 26 },
                    { new Guid("6c8e2d97-0c60-4812-acd8-868a1affbd73"), 2, 31 },
                    { new Guid("71b39c26-230a-4331-a448-c6144cf99e7f"), 2, 40 },
                    { new Guid("89dafb16-28e7-4fa9-b66d-ca8b944db261"), 2, 48 },
                    { new Guid("8cb945b1-c6ab-4237-8501-0e05f4e6aa83"), 2, 53 },
                    { new Guid("b5ac0163-7d9d-43b4-a980-44e42e4999ed"), 2, 67 },
                    { new Guid("bb1da4ee-31df-4fb6-916a-1548acfdc111"), 2, 72 },
                    { new Guid("c76f49c6-01dc-437d-a9a6-7c90c4e03b48"), 2, 102 },
                    { new Guid("ccfde94d-62dc-4ec7-8538-c800e00c280d"), 2, 80 },
                    { new Guid("e0f75a82-e1f0-40de-bd43-57ce0c1d52b7"), 2, 95 },
                    { new Guid("ecc825cb-9cce-4597-9369-a9e543700d26"), 2, 90 },
                    { new Guid("01087e47-19aa-4ae9-8670-ee69d9223a02"), 3, 1 },
                    { new Guid("0b7eeadd-9b05-4083-a1d9-ab92f3df285c"), 3, 12 },
                    { new Guid("39978fd8-a449-47b6-b8ed-0e3461a20073"), 3, 17 },
                    { new Guid("52623100-c0e1-460a-9bca-5dfe2592f9cf"), 3, 21 },
                    { new Guid("55b9e08d-d622-47ea-b341-bad40def946d"), 3, 27 },
                    { new Guid("6c8e2d97-0c60-4812-acd8-868a1affbd73"), 3, 32 },
                    { new Guid("71b39c26-230a-4331-a448-c6144cf99e7f"), 3, 41 },
                    { new Guid("7cd6924c-8938-4530-857a-3055efb9311a"), 3, 44 },
                    { new Guid("89dafb16-28e7-4fa9-b66d-ca8b944db261"), 3, 49 },
                    { new Guid("8cb945b1-c6ab-4237-8501-0e05f4e6aa83"), 3, 54 },
                    { new Guid("b5ac0163-7d9d-43b4-a980-44e42e4999ed"), 3, 68 },
                    { new Guid("bb1da4ee-31df-4fb6-916a-1548acfdc111"), 3, 73 },
                    { new Guid("c76f49c6-01dc-437d-a9a6-7c90c4e03b48"), 3, 103 },
                    { new Guid("ccfde94d-62dc-4ec7-8538-c800e00c280d"), 3, 81 },
                    { new Guid("e0f75a82-e1f0-40de-bd43-57ce0c1d52b7"), 3, 96 },
                    { new Guid("ecc825cb-9cce-4597-9369-a9e543700d26"), 3, 91 },
                    { new Guid("01087e47-19aa-4ae9-8670-ee69d9223a02"), 4, 2 },
                    { new Guid("07401f68-4576-4079-adc4-dd650f677fd3"), 4, 7 },
                    { new Guid("0b7eeadd-9b05-4083-a1d9-ab92f3df285c"), 4, 13 },
                    { new Guid("39978fd8-a449-47b6-b8ed-0e3461a20073"), 4, 18 },
                    { new Guid("55b9e08d-d622-47ea-b341-bad40def946d"), 4, 28 },
                    { new Guid("6c8e2d97-0c60-4812-acd8-868a1affbd73"), 4, 33 },
                    { new Guid("71b39c26-230a-4331-a448-c6144cf99e7f"), 4, 42 },
                    { new Guid("7cd6924c-8938-4530-857a-3055efb9311a"), 4, 45 },
                    { new Guid("89dafb16-28e7-4fa9-b66d-ca8b944db261"), 4, 50 },
                    { new Guid("8cb945b1-c6ab-4237-8501-0e05f4e6aa83"), 4, 55 },
                    { new Guid("b03034a9-9058-4a83-b146-92ba1a217c83"), 4, 62 },
                    { new Guid("b5ac0163-7d9d-43b4-a980-44e42e4999ed"), 4, 69 },
                    { new Guid("bb1da4ee-31df-4fb6-916a-1548acfdc111"), 4, 74 },
                    { new Guid("c76f49c6-01dc-437d-a9a6-7c90c4e03b48"), 4, 104 },
                    { new Guid("ccfde94d-62dc-4ec7-8538-c800e00c280d"), 4, 82 },
                    { new Guid("d3c4f6cf-a03c-4c1f-bc4b-52f2d1aaf228"), 4, 84 },
                    { new Guid("e0f75a82-e1f0-40de-bd43-57ce0c1d52b7"), 4, 97 },
                    { new Guid("ecc825cb-9cce-4597-9369-a9e543700d26"), 4, 92 },
                    { new Guid("01087e47-19aa-4ae9-8670-ee69d9223a02"), 5, 3 },
                    { new Guid("07401f68-4576-4079-adc4-dd650f677fd3"), 5, 8 },
                    { new Guid("0b7eeadd-9b05-4083-a1d9-ab92f3df285c"), 5, 14 },
                    { new Guid("39978fd8-a449-47b6-b8ed-0e3461a20073"), 5, 19 },
                    { new Guid("52623100-c0e1-460a-9bca-5dfe2592f9cf"), 5, 22 },
                    { new Guid("55b9e08d-d622-47ea-b341-bad40def946d"), 5, 29 },
                    { new Guid("6c8e2d97-0c60-4812-acd8-868a1affbd73"), 5, 34 },
                    { new Guid("71b39c26-230a-4331-a448-c6144cf99e7f"), 5, 43 },
                    { new Guid("7cd6924c-8938-4530-857a-3055efb9311a"), 5, 46 },
                    { new Guid("89dafb16-28e7-4fa9-b66d-ca8b944db261"), 5, 51 },
                    { new Guid("8cb945b1-c6ab-4237-8501-0e05f4e6aa83"), 5, 56 },
                    { new Guid("b03034a9-9058-4a83-b146-92ba1a217c83"), 5, 63 },
                    { new Guid("b5ac0163-7d9d-43b4-a980-44e42e4999ed"), 5, 70 },
                    { new Guid("bb1da4ee-31df-4fb6-916a-1548acfdc111"), 5, 75 },
                    { new Guid("c76f49c6-01dc-437d-a9a6-7c90c4e03b48"), 5, 105 },
                    { new Guid("ccfde94d-62dc-4ec7-8538-c800e00c280d"), 5, 83 },
                    { new Guid("d3c4f6cf-a03c-4c1f-bc4b-52f2d1aaf228"), 5, 85 },
                    { new Guid("e0f75a82-e1f0-40de-bd43-57ce0c1d52b7"), 5, 98 },
                    { new Guid("ecc825cb-9cce-4597-9369-a9e543700d26"), 5, 93 },
                    { new Guid("01087e47-19aa-4ae9-8670-ee69d9223a02"), 6, 4 },
                    { new Guid("07401f68-4576-4079-adc4-dd650f677fd3"), 6, 9 },
                    { new Guid("52623100-c0e1-460a-9bca-5dfe2592f9cf"), 6, 23 },
                    { new Guid("6c8e2d97-0c60-4812-acd8-868a1affbd73"), 6, 35 },
                    { new Guid("8cb945b1-c6ab-4237-8501-0e05f4e6aa83"), 6, 57 },
                    { new Guid("b03034a9-9058-4a83-b146-92ba1a217c83"), 6, 64 },
                    { new Guid("bb1da4ee-31df-4fb6-916a-1548acfdc111"), 6, 76 },
                    { new Guid("c76f49c6-01dc-437d-a9a6-7c90c4e03b48"), 6, 106 },
                    { new Guid("d3c4f6cf-a03c-4c1f-bc4b-52f2d1aaf228"), 6, 86 },
                    { new Guid("e0f75a82-e1f0-40de-bd43-57ce0c1d52b7"), 6, 99 },
                    { new Guid("01087e47-19aa-4ae9-8670-ee69d9223a02"), 7, 5 },
                    { new Guid("07401f68-4576-4079-adc4-dd650f677fd3"), 7, 10 },
                    { new Guid("52623100-c0e1-460a-9bca-5dfe2592f9cf"), 7, 24 },
                    { new Guid("6c8e2d97-0c60-4812-acd8-868a1affbd73"), 7, 36 },
                    { new Guid("8cb945b1-c6ab-4237-8501-0e05f4e6aa83"), 7, 58 },
                    { new Guid("b03034a9-9058-4a83-b146-92ba1a217c83"), 7, 65 },
                    { new Guid("bb1da4ee-31df-4fb6-916a-1548acfdc111"), 7, 77 },
                    { new Guid("d3c4f6cf-a03c-4c1f-bc4b-52f2d1aaf228"), 7, 87 },
                    { new Guid("e0f75a82-e1f0-40de-bd43-57ce0c1d52b7"), 7, 100 },
                    { new Guid("01087e47-19aa-4ae9-8670-ee69d9223a02"), 8, 6 },
                    { new Guid("8cb945b1-c6ab-4237-8501-0e05f4e6aa83"), 8, 59 },
                    { new Guid("bb1da4ee-31df-4fb6-916a-1548acfdc111"), 8, 78 },
                    { new Guid("d3c4f6cf-a03c-4c1f-bc4b-52f2d1aaf228"), 8, 88 },
                    { new Guid("8cb945b1-c6ab-4237-8501-0e05f4e6aa83"), 9, 60 },
                    { new Guid("6c8e2d97-0c60-4812-acd8-868a1affbd73"), 10, 37 },
                    { new Guid("8cb945b1-c6ab-4237-8501-0e05f4e6aa83"), 10, 61 },
                    { new Guid("6c8e2d97-0c60-4812-acd8-868a1affbd73"), 11, 38 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderProduct_ProductsId",
                table: "OrderProduct",
                column: "ProductsId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderProducts_OrderId",
                table: "OrderProducts",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_ColorId",
                table: "Orders",
                column: "ColorId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_SizeId",
                table: "Orders",
                column: "SizeId");

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
                name: "OrderProduct");

            migrationBuilder.DropTable(
                name: "OrderProducts");

            migrationBuilder.DropTable(
                name: "ProductColors");

            migrationBuilder.DropTable(
                name: "ProductSizes");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Colors");

            migrationBuilder.DropTable(
                name: "Sizes");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Categories");
        }
    }
}
