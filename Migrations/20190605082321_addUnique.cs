using Microsoft.EntityFrameworkCore.Migrations;

namespace WebDictionary.Migrations
{
    public partial class addUnique : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Word",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Word_Name",
                table: "Word",
                column: "Name");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropUniqueConstraint(
                name: "AK_Word_Name",
                table: "Word");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Word",
                nullable: true,
                oldClrType: typeof(string));
        }
    }
}
