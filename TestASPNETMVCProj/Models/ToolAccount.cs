using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace TestASPNETMVCProj.Models
{
    /// <summary>
    /// Класс учёта инструмента за сотрудником
    /// </summary>
    public class ToolAccount
    {
        [Key]
        public int ToolAccountId { get; set; }

        [ForeignKey("Worker")]
        public int WorkerId { get; set; }
        public Worker Worker { get; set; }

        [ForeignKey("Tool")]
        public int ToolId { get; set; }
        public Tool Tool { get; set; }
    }
}