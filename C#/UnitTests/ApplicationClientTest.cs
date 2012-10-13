using System;
using System.Threading.Tasks;
using iKnodeSdk.UnitTest.Domain;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace iKnodeSdk.UnitTest
{
    /// <summary>
    /// Defines the Application Client Unit Test.
    /// </summary>
    [TestClass]
    public class ApplicationClientTest
    {
        /// <summary>
        /// User Identifier.
        /// </summary>
        private static string UserId = "";

        /// <summary>
        /// API Key.
        /// </summary>
        private static string ApiKey = "";

        /// <summary>
        /// Tests the Execute with no parameters Method.
        /// </summary>
        [TestMethod]
        public void Execute_NoParamsTest()
        {
            ApplicationClient userSvc = new ApplicationClient("https://api.iknode.com", UserId, ApiKey, "UserService");

            string result = userSvc.Execute<string>("GetMostCommonFirstName");

            Assert.AreEqual<string>("John", result);
        }

        /// <summary>
        /// Tests the Execute with parameters Method.
        /// </summary>
        [TestMethod]
        public void Execute_withParamsTest()
        {
            ApplicationClient userSvc = new ApplicationClient("https://api.iknode.com", UserId, ApiKey, "UserService");

            string result = userSvc.Execute<string>("GetFirstNameById", new MethodParameter("id", 1));

            Assert.AreEqual<string>("Robert", result);
        }

        /// <summary>
        /// Tests the Execute using Complex Objects with no parameters Method.
        /// </summary>
        [TestMethod]
        public void Execute_ComplexObject_NoParamsTest()
        {
            ApplicationClient userSvc = new ApplicationClient("https://api.iknode.com", UserId, ApiKey, "UserService");

            User expected = new User(2, new FullName("Jane", "Doe"));
            User actual = userSvc.Execute<User>("CreateDefault");
            
            Assert.IsNotNull(actual);
            Assert.AreEqual<int>(expected.Id, actual.Id);
            Assert.IsNotNull(actual.Name);
            Assert.AreEqual<string>(expected.Name.FirstName, actual.Name.FirstName);
            Assert.AreEqual<string>(expected.Name.LastName, actual.Name.LastName);
        }

        /// <summary>
        /// Tests the Execute using Complex Objects with no parameters Method.
        /// </summary>
        [TestMethod]
        public void Execute_ComplexObject_withParamsTest()
        {
            ApplicationClient userSvc = new ApplicationClient("https://api.iknode.com", UserId, ApiKey, "UserService");

            User expected = new User(1, new FullName("Alex", "Espinoza"));
            User actual = userSvc.Execute<User>("Create", new MethodParameter("id", expected.Id), new MethodParameter("name", expected.Name));
            
            Assert.IsNotNull(actual);
            Assert.AreEqual<int>(expected.Id, actual.Id);
            Assert.IsNotNull(actual.Name);
            Assert.AreEqual<string>(expected.Name.FirstName, actual.Name.FirstName);
            Assert.AreEqual<string>(expected.Name.LastName, actual.Name.LastName);
        }

        /// <summary>
        /// Tests the Execute using Complex Objects with no parameters Method.
        /// </summary>
        [TestMethod]
        public void ExecuteAsync_ComplexObject_withParamsTest()
        {
            ApplicationClient userSvc = new ApplicationClient("https://api.iknode.com", UserId, ApiKey, "UserService");

            User expected = new User(1, new FullName("Alex", "Espinoza"));
            Action<User> callback = (actual) => {
                Assert.IsNotNull(actual);
                Assert.AreEqual<int>(expected.Id, actual.Id);
                Assert.IsNotNull(actual.Name);
                Assert.AreEqual<string>(expected.Name.FirstName, actual.Name.FirstName);
                Assert.AreEqual<string>(expected.Name.LastName, actual.Name.LastName);
            };

            Task<User> task = userSvc.ExecuteAsync<User>(callback, "Create", new MethodParameter("id", expected.Id), new MethodParameter("name", expected.Name));
            task.Wait();
        }
    }
}