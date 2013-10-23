using System;
using Newtonsoft.Json;

namespace iKnodeSdk
{
    /// <summary>
    /// Defines the Method Parameter.
    /// </summary>
    public class MethodParameter
    {
		/// <summary>
		/// Gets or Sets the Parameter Name.
		/// </summary>
		/// <value>Parameter Name.</value>
		public string Name
		{
			get;
			set;
		}

		/// <summary>
		/// Gets or Sets the Parameter Value.
		/// </summary>
		/// <value>Parameter Value.</value>
		public object Value
		{
			get;
			set;
		}

        /// <summary>
        /// Initializes a new instance of the <see cref="MethodParameter"/> class.
        /// </summary>
        /// <param name="name">Parameter Name.</param>
        /// <param name="value">Parameter Value.</param>
		public MethodParameter(string name, object value)
		{
			this.Name = name;
			this.Value = value;
		}

        /// <summary>
        /// Initializes a new instance of the <see cref="MethodParameter"/> class.
        /// </summary>
        /// <param name="name">Parameter Name.</param>
        /// <param name="value">Parameter Value.</param>
        /// <param name="valueType">Value Type.</param>
        public MethodParameter(string name, string value, string valueType)
		{
			this.Name = name;
			this.Value = value;

            this.Value = JsonConvert.DeserializeObject(value, Type.GetType(valueType));
		}
    }
}
