package iKnodeSdk;

/**
 * Defines the MethodParameter.
 * 
 * @author jgemedina
 * @version 0.1
 */
public final class MethodParameter {
	/**
	 * Parameter name.
	 * 
	 * @since 0.1
	 */
	private String _name;
	
	/**
	 * Parameter value.
	 * 
	 * @since 0.1
	 */
	private Object _value;

	/**
	 * Gets the Parameter name.
	 * 
	 * @return Parameter name.
	 * @since 0.1
	 */
	public String getName() {
		return _name;
	}

	/**
	 * Sets the Parameter name.
	 * 
	 * @param _name Parameter name.
	 * @since 0.1
	 */
	public void setName(String _name) {
		this._name = _name;
	}

	/**
	 * Gets the Parameter value.
	 * 
	 * @return Parameter value.
	 * @since 0.1
	 */
	public Object getValue() {
		return _value;
	}

	/**
	 * Sets the Parameter value.
	 * 
	 * @param value Parameter value.
	 * @since 0.1
	 */
	public void setValue(Object value) {
		this._value = value;
	}
	
	/**
	 * Initializes a new instance of {@link MethodParameter} class.
	 * 
	 * @param name Parameter name.
	 * @param value Parameter value.
	 * @since 0.1
	 */
	public MethodParameter(final String name, final Object value)
	{
		this._name = name;
		this._value = value;
	}
}