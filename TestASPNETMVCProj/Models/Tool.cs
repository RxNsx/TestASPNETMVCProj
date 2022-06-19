using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TestASPNETMVCProj.Models
{
    /// <summary>
    /// Инструмент
    /// </summary>
    public class Tool
    {
        public int ToolId { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
    }
}