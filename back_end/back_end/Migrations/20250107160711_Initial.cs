using System;
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
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("03c45a62-138b-4ae2-9c7a-3196af0e7f7f"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("75a9ff39-f6c4-4cd7-8f4a-345077faaaba"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("cb5cce1c-892d-4261-9c60-a46c3139f09a"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("e6507233-e927-44a7-979a-28ed2882edc3"));

            migrationBuilder.AlterColumn<string>(
                name: "ProductId",
                table: "Orders",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Orders",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "GoogleId", "Name", "Password", "Phone", "Role" },
                values: new object[,]
                {
                    { new Guid("25918d03-def6-4dc9-9338-d2af1cddfdd8"), "user456@gmail.com", null, null, "$2a$11$3GHcJoZ56L8PZSzZdowwCO58OtMwHXB7zSL6nm1rs8qauilwbrevu", null, "User" },
                    { new Guid("443be4ae-342c-4e87-abee-e05ff882c27d"), "user789@gmail.com", null, null, "$2a$11$LU4iQgceSb6GVTSldQYRT.iTmkr7X.IcqCMNAOwbUugrsFJd/PXjW", null, "User" },
                    { new Guid("809e0179-f40e-4399-86fe-7db2f512e1c9"), "admin@minhstore.com", null, null, "$2a$11$X4rubRFuXQ58hL26UwL4..lioeW0QrwLrVWrx5NM3BnU/i9FDkYHC", null, "Admin" },
                    { new Guid("9ec97afc-e072-4773-b38d-9209c37a17ee"), "user123@gmail.com", null, null, "$2a$11$65j5jBVmrnsqLTeWtoZZVeU/8r1rQSbltVrSPKUA4Sf6mkn5RVKSy", null, "User" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("25918d03-def6-4dc9-9338-d2af1cddfdd8"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("443be4ae-342c-4e87-abee-e05ff882c27d"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("809e0179-f40e-4399-86fe-7db2f512e1c9"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("9ec97afc-e072-4773-b38d-9209c37a17ee"));

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Orders");

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "ProductId",
                keyValue: null,
                column: "ProductId",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "ProductId",
                table: "Orders",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "GoogleId", "Name", "Password", "Phone", "Role" },
                values: new object[,]
                {
                    { new Guid("03c45a62-138b-4ae2-9c7a-3196af0e7f7f"), "admin@minhstore.com", null, null, "$2a$11$ZPfmooQIPUBuYiFC69C26.JNNwv0nO3Lm86/jD0hbF.tPa/kr94CG", null, "Admin" },
                    { new Guid("75a9ff39-f6c4-4cd7-8f4a-345077faaaba"), "user456@gmail.com", null, null, "$2a$11$q323eGbwysxMVUAJdt1ZVe7yBysaRjX1ACVNwMF5ODlA29AfTEdgO", null, "User" },
                    { new Guid("cb5cce1c-892d-4261-9c60-a46c3139f09a"), "user123@gmail.com", null, null, "$2a$11$27sTgbNw14Y9kPPMdjXHOeIasnkPxXEzBP7Q1DMF.Q9et/yPdf3kK", null, "User" },
                    { new Guid("e6507233-e927-44a7-979a-28ed2882edc3"), "user789@gmail.com", null, null, "$2a$11$orTA9mYH2bpUD56wHuvnMO8SFPJWaoG32I.tI8VeVqRzzwyPaeS8u", null, "User" }
                });
        }
    }
}
