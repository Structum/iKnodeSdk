using System;
using System.IO;
using System.Net;
using System.Text;
using Newtonsoft.Json;
using System.Threading.Tasks;
using System.Text.RegularExpressions;

namespace iKnodeSdk
{
    /// <summary>
    /// Defines the iKnode Client.
    /// </summary>
    /// <example>
    /// The following shows you how to use the Client with <b>Sync</b> methods:
    /// <code>
    /// ApplicationClient appClient = new ApplicationClient(myUserId, myApiKey, "MyApplication");
    ///
    /// // Call the Execute Method.
    /// string result = appClient.Execute&lt;string&gt;("MyMethod", new MethodParameter("Param1", "Param1Value"),  new MethodParameter("Param2", "Param2Value"));
    /// </code>
    /// <br />
    /// The following shows you how to use the Client with <b>Asnyc</b> methods:
    /// <code>
    /// ApplicationClient appClient = new ApplicationClient(myUserId, myApiKey, "MyApplication");
    /// 
    /// // Create the Callback.
    /// Action&lt;string&gt; callback = (result) => {
    ///     Console.WriteLine(result);
    /// };
    ///
    /// // Call the Execute Async Method.
    /// Task&lt;string&gt; task = appClient.ExecuteAsync&lt;string&gt;(callback, "MyMethod", new MethodParameter("Param1", "Param1Value"),  new MethodParameter("Param2", "Param2Value"));
    /// task.Wait();
    /// </code>
    /// </example>
    public class ApplicationClient
    {
        /// <summary>
        /// API URL.
        /// </summary>
        private const string ApiUrl = "https://api.iknode.com";

        /// <summary>
        /// Gets or Sets the iKnode API Service URL.
        /// </summary>
        private string ServiceUrl
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or Sets the User Identifier.
        /// </summary>
        /// <value>User Identifier.</value>
        private string UserId 
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or Sets the API Key.
        /// </summary>
        /// <value>API Key.</value>
        private string ApiKey
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the Application Name.
        /// </summary>
        public string ApplicationName
        {
            get;
            private set;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ApplicationClient"/> class.
        /// </summary>
        /// <param name="serviceUrl">Service URL.</param>
        /// <param name="userId">User Identifier.</param>
        /// <param name="apiKey">API Key.</param>
        /// <param name="applicationName">Application Name.</param>
        public ApplicationClient(string serviceUrl, string userId, string apiKey, string applicationName)
        {
            this.ServiceUrl = serviceUrl;
            this.UserId = userId;
            this.ApiKey = apiKey;
            this.ApplicationName = applicationName;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ApplicationClient"/> class.
        /// </summary>
        /// <param name="userId">User Identifier.</param>
        /// <param name="apiKey">API Key.</param>
        /// <param name="applicationName">Application Name.</param>
        public ApplicationClient(string userId, string apiKey, string applicationName) : this(ApiUrl, userId, apiKey, applicationName)
        {
        }

        /// <summary>
        /// Executes the method with the selected parameters for the current application.
        /// </summary>
        /// <typeparam name="T">Result Type.</typeparam>
        /// <param name="methodName">Method to execute.</param>
        /// <param name="parameters">Parameters to use.</param>
        /// <returns>Result Object.</returns>
        public T Execute<T>(string methodName,  params MethodParameter[] parameters)
        {
            string result = ExecuteRequest(this.ServiceUrl, this.UserId, this.ApiKey, this.ApplicationName, methodName, parameters);

            var trimmedResult = result.Trim();
            if (!trimmedResult.StartsWith("{") && !trimmedResult.StartsWith("[")) {
                return (T) Convert.ChangeType(result, typeof(T));
            }

            T resultObj = JsonConvert.DeserializeObject<T>(result);

            return resultObj;
        }

        /// <summary>
        /// Executes the method with the selected parameters for the current application.
        /// </summary>
        /// <typeparam name="T">Result Type.</typeparam>
        /// <param name="callback">Callback Method.</param>
        /// <param name="methodName">Method to execute.</param>
        /// <param name="parameters">Parameters to use.</param>
        public Task<T> ExecuteAsync<T>(Action<T> callback, string methodName,  params MethodParameter[] parameters)
        {
            Task<T> task = Task.Factory.StartNew(() => this.Execute<T>(methodName, parameters));

            if(callback != null) {
                task.ContinueWith((antecendent => callback(antecendent.Result)));
            }

            return task;
        }

        /// <summary>
        /// Executes the method with the selected parameters for the current application.
        /// </summary>
        /// <param name="serviceUrl">Service URL.</param>
        /// <param name="userId">User Identifier.</param>
        /// <param name="apiKey">API Key.</param>
        /// <param name="appName">Application Name.</param>
        /// <param name="methodName">Method to execute.</param>
        /// <param name="parameters">Parameters to use.</param>
        /// <returns>Result Object.</returns>
        private static string ExecuteRequest(string serviceUrl, string userId, string apiKey, string appName, string methodName, params MethodParameter[] parameters)
        {
            string appSvcUrl = String.Format("{0}/v3/{1}/{2}/{3}", serviceUrl, userId, appName, methodName);

            HttpWebRequest request = (HttpWebRequest) WebRequest.Create(appSvcUrl);
            request.Method = "POST";
            request.ContentType = "application/json";
            request.Headers.Add("iKnode-ApiKey", apiKey);

            string requestBody = FormatParameters(parameters);

            byte[] data = Encoding.UTF8.GetBytes(requestBody);
            using(Stream dataStream = request.GetRequestStream()) {
                dataStream.Write(data, 0, data.Length);
            }

            HttpWebResponse response = (HttpWebResponse) request.GetResponse();

            var responseStream = response.GetResponseStream();
            if (responseStream == null) {
                return String.Empty;
            }

            string result = new StreamReader(responseStream).ReadToEnd();
            return CleanResult(result);
        }

        /// <summary>
        /// Cleans the Executon Result String.
        /// </summary>
        /// <param name="result">Execution Result String to clean.</param>
        /// <returns>Clean Result String.</returns>
        private static string CleanResult(string result)
        {
            // Clean Result.
            result = Regex.Replace(result, "^\"|\"$", "");
            result = Regex.Replace(result, "\\\\\"", "\"");
            return result;
        }

        /// <summary>
        /// Formats the parameter array to be used for the JSON REST command.
        /// </summary>
        /// <param name="parameters">Parameter Array.</param>
        /// <returns>Formatted Parameter String.</returns>
        private static string FormatParameters(MethodParameter[] parameters)
        {
            StringBuilder paramBuilder = new StringBuilder();

            paramBuilder.Append("{");

            int index = 0;
            int count = parameters.Length;
            foreach(MethodParameter parameter in parameters) {
                string paramValue = String.Empty;
                if(parameter.Value != null) {

                    paramValue = parameter.Value.ToString();
                    if(!IsPrimitiveType(parameter.Value.GetType())) {
                        paramValue = JsonConvert.SerializeObject(parameter.Value);
                    }
                }

                paramBuilder.AppendFormat(" \"{0}\":{1}", parameter.Name, paramValue);
                
                if(++index < count) {
                    paramBuilder.Append(",");
                }
            }

            paramBuilder.Append("}");

            return paramBuilder.ToString();
        }

        /// <summary>
        /// Returns true if the type is a primitive type, false otherwise.
        /// </summary>
        /// <param name="type">Type to check.</param>
        /// <returns>rue if the type is a primitive type, false otherwise.</returns>
        private static bool IsPrimitiveType(Type type)
        {
            return Type.GetTypeCode(type) != TypeCode.Object;
        }
    }
}
