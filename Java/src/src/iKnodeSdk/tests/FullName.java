package iKnodeSdk.tests;

/**
 * 
 * @author jgemedina
 *
 */
public final class FullName
	implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 5468137389699560675L;

	/**
	 * 
	 */
	private String _firstName;
	
	/**
	 * 
	 */
	private String _lastName;
	
	/**
	 * 
	 * @param firstName
	 * @param lastName
	 */
	public FullName(final String firstName, final String lastName) {
		this.setFirstName(firstName);
		this.setLastName(lastName);
	}

	/**
	 * 
	 * @return
	 */
	public String getFirstName() {
		return _firstName;
	}

	/**
	 * 
	 * @param firstName
	 */
	public void setFirstName(final String firstName) {
		this._firstName = firstName;
	}
	
	/**
	 * 
	 * @return
	 */
	public String getLastName() {
		return this._lastName;
	}
	
	/**
	 * 
	 * @param lastName
	 */
	public void setLastName(final String lastName) {
		this._lastName = lastName;
	}
}
