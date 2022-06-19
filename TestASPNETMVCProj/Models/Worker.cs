using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TestASPNETMVCProj.Models
{
    /// <summary>
    /// Класс рабочего
    /// </summary>
    public class Worker
    {
        public int WorkerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
    }
}