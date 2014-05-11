using System;
using Newtonsoft.Json;

namespace iKnodeSdk
{
    /// <summary>
    /// Defines the Serialization Helper.
    /// </summary>
    internal class SerializationHelper
    {
        /// <summary>
        /// Returns true if the type is a primitive type, false otherwise.
        /// </summary>
        /// <param name="type">Type to check.</param>
        /// <returns>True if the type is a primitive type, false otherwise.</returns>
        public static bool IsPrimitiveType(Type type)
        {
            return Type.GetTypeCode(type) != TypeCode.Object;
        }

        /// <summary>
        /// Returns true if the type is a numeric type, false otherwise.
        /// </summary>
        /// <param name="type">Type to Check.</param>
        /// <param name="textValue">Text Value.</param>
        /// <returns>True if the type is a numeric type, false otherwise.</returns>
        public static bool IsNumericType(Type type, string textValue)
        {
            var typeCode = Type.GetTypeCode(type);

            if (typeCode == TypeCode.String) {
                double temp;
                return double.TryParse(textValue, out temp);
            }

            return typeCode == TypeCode.Int16 || typeCode == TypeCode.Int32 || typeCode == TypeCode.Int64 ||
                   typeCode == TypeCode.Decimal || typeCode == TypeCode.Double || typeCode == TypeCode.Single ||
                   typeCode == TypeCode.UInt16 || typeCode == TypeCode.UInt32 || typeCode == TypeCode.UInt64;
        }

        /// <summary>
        /// Deserializes the object.
        /// </summary>
        /// <param name="value">Value to Deserialize.</param>
        /// <param name="valueType">Value Type.</param>
        /// <returns></returns>
        public static object DeserializeObject(string value, string valueType)
        {
            var type = Type.GetType(valueType);
            return !IsPrimitiveType(type) ? JsonConvert.DeserializeObject(value, type) 
                                          : String.Format("{0}", value);
        }
    }
}
