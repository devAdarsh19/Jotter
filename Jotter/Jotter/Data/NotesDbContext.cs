using Jotter.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace Jotter.Data
{
    public class NotesDbContext : DbContext
    {
        public NotesDbContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Note> Notes { get; set; }
    }
}
