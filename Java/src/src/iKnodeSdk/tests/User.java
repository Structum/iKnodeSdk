package iKnodeSdk.tests;

/**
 * 
 * @author jgemedina
 *
 */
public final class User
	implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2473561599633928125L;

	/**
	 * 
	 */
	private int _id;
	
	/**
	 * 
	 */
	private FullName _name;
	
	/**
	 * 
	 * @param id
	 * @param name
	 */
	public User(final int id, final FullName name) {
		this.setId(id);
		this.setName(name);
	}
	
	/**
	 * 
	 * @return
	 */
	public int getId() {
		return this._id;
	}
	
	/**
	 * 
	 * @param id
	 */
	public void setId(int id) {
		this._id = id;
	}

	/**
	 * 
	 * @return
	 */
	public FullName getName() {
		return _name;
	}

	/**
	 * 
	 * @param _name
	 */
	public void setName(final FullName name) {
		this._name = name;
	}
}
