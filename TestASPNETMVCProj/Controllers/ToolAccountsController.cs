using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using TestASPNETMVCProj.Models;

namespace FullCopy.Controllers
{
    public class ToolAccountsController : Controller
    {
        private DataContext context = new DataContext();

        [HttpGet]
        public ActionResult Index()
        {
            var toolAccounts = context.ToolAccounts.Include(t => t.Tool).Include(t => t.Worker);

            if (toolAccounts == null)
            {
                return HttpNotFound();
            }

            return View(toolAccounts.ToList());
        }

        [HttpGet]
        public JsonResult List()
        {
            var toolAccounts = context.ToolAccounts.Include(t => t.Tool).Include(t => t.Worker);

            return Json(toolAccounts, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult WorkerList()
        {
            var allWorkers = context.Workers.ToList();

            return Json(allWorkers, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult AddToolsWorker(ToolAccount toolAccount)
        {

            if (toolAccount != null)
            {
                if (toolAccount.ToolId == 0 ||  toolAccount.WorkerId == 0)
                {

                }
                else
                {
                    context.ToolAccounts.Add(toolAccount);

                    context.SaveChanges();
                }
            }

            return Json(context.ToolAccounts.Include(t => t.Tool).Include(t => t.Worker), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return HttpNotFound();
            }

            ToolAccount toolAccount = context.ToolAccounts.Find(id);

            if (toolAccount == null)
            {
                return HttpNotFound();
            }

            context.ToolAccounts.Remove(toolAccount);

            context.SaveChanges();

            return Json(context.ToolAccounts.Include(t => t.Tool).Include(t => t.Worker), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetLastTools()
        {

            var toolsUsed = context.ToolAccounts.GroupBy(x => x.ToolId)
                .Select(x => new { toolId = x.Key, quantityUsed = x.Count() });

            var toolsRemaining = (from t in context.Tools
                                  join tu in toolsUsed on t.ToolId equals tu.toolId into g
                                  from tuUsedNone in g.DefaultIfEmpty()
                                  select (new { Id = t.ToolId, Name = t.Name, toolsRemaining = (tuUsedNone == null) ? t.Quantity : t.Quantity - tuUsedNone.quantityUsed }))
                .ToList();

            return Json(toolsRemaining, JsonRequestBehavior.AllowGet);
        }

    }
}
