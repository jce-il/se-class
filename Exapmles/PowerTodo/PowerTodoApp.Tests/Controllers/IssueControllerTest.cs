using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using NUnit.Framework;
using PowerTodoApp.Controllers;
using PowerTodoApp.Models;

namespace PowerTodoApp.Tests.Controllers
{
    class IssueControllerTest
    {
        [Test]
        public void DefaultView_HasSomeIssues()
        {
            var controller = new IssuesController();

            var result = controller.Index() as ViewResult;
            var issues = result.Model as IEnumerable<Issue>;

            Assert.IsNotEmpty(issues);
            //Assert.AreEqual("Teach mocks", issues.First().Title);
        }
    }
}
