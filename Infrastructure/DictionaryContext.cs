using Microsoft.EntityFrameworkCore;
using WebDictionary.Entities;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace WebDictionary.Infrastructure
{
    public class DictionaryContext : DbContext
    {
        public DbSet<Error> Errors { get; set; }
        public DbSet<Word> Words { get; set; }

        public DictionaryContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (var entity in modelBuilder.Model.GetEntityTypes())
            {
                entity.Relational().TableName = entity.DisplayName();
            }
        }
    }
}
