using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit.Framework;
using PowerTodoApp.Models;

namespace PowerTodoApp.Tests.Models
{
    class IssueTest
    {
        [Test]
        public void IssueCanBeCompleted()
        {
            // Arrange
            var newIssue = new Issue();

            // Act
            newIssue.Completed = true;

            // Assert
            Assert.IsTrue(newIssue.Completed);
        }
    }
}
