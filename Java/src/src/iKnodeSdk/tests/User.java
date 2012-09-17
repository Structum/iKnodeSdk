package iKnodeSdk.tests;

/**
 * 
 * @author jgemedina
 *
 */
public class User {
	
	/**
	 * User Id.
	 */
	public int Id;
	
	/**
	 * User Full Name.
	 */
	public FullName Name;
	
	/**
	 * 
	 * @param id
	 * @param name
	 */
	public User(final int id, final FullName name) {
		this.Id = id;
		this.Name = name;
	}
}
