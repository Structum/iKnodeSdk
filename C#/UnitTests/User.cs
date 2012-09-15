using System;

namespace iKnodeSdk.UnitTest.Domain
{
    /// <summary>
    /// Defines the Full Name class.
    /// </summary>
    [Serializable]
    public class FullName
    {
        /// <summary>
        /// First Name.
        /// </summary>
        public string FirstName;

        /// <summary>
        /// Last Name.
        /// </summary>
        public string LastName;
        
        /// <summary>
        /// Initializes a new instance of the <see cref="FullName"/> class.
        /// </summary>
        /// <param name="firstName">First Name/</param>
        /// <param name="lastName">Last Name.</param>
        public FullName(string firstName, string lastName)
        {
            this.FirstName = firstName;
            this.LastName = lastName;
        }
    }
    
    /// <summary>
    /// Defines the User class.
    /// </summary>
    [Serializable]
    public class User
    {
        /// <summary>
        /// Identifier.
        /// </summary>
        public int Id;

        /// <summary>
        /// Full Name.
        /// </summary>
        public FullName Name;
        
        /// <summary>
        /// Initializes a new instance of the <see cref="User"/> class.
        /// </summary>
        /// <param name="id">Identifier.</param>
        /// <param name="name">Name.</param>
        public User(int id, FullName name)
        {
            this.Id = id;
            this.Name = name;
        }
    }
}