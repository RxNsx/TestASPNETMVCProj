using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace TestASPNETMVCProj.Models
{
    public class DataContext : DbContext
    {
        public DataContext() : base("DataContext") { }
        public DbSet<ToolAccount> ToolAccounts { get; set; }
        public DbSet<Worker> Workers { get; set; }
        public DbSet<Tool> Tools { get; set; }

    }
}