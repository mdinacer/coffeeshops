using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    public partial class OperationElementRenameProductToProductName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Product",
                table: "OperationsElements");

            migrationBuilder.CreateIndex(
                name: "IX_OperationsElements_ProductId",
                table: "OperationsElements",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_OperationsElements_Products_ProductId",
                table: "OperationsElements",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OperationsElements_Products_ProductId",
                table: "OperationsElements");

            migrationBuilder.DropIndex(
                name: "IX_OperationsElements_ProductId",
                table: "OperationsElements");

            migrationBuilder.AddColumn<string>(
                name: "Product",
                table: "OperationsElements",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
