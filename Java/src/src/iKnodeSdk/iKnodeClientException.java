package iKnodeSdk;

/**
 * Defines a generic Exception type.
 * 
 * @author jgemedina
 * @version 0.1
 */
public final class iKnodeClientException extends Exception {

	/**
	 *  Class Serial Id.
	 *  
	 *  @since 0.1
	 */
	private static final long serialVersionUID = -3062368242694621398L;

	/**
	 * Creates a new instance of the {@link iKnodeClientException} class.
	 * 
	 * @since 0.1
	 */
	public iKnodeClientException()
	{
		super();
	}
	
	/**
	 * Creates a new instance of the {@link iKnodeClientException} class.
	 * 
	 * @param message Exception message.
	 * @since 0.1
	 */
	public iKnodeClientException(final String message)
	{
		super(message);
	}
	
	/**
	 * Creates a new instance of the {@link iKnodeClientException} class.
	 * 
	 * @param thr Inner exception.
	 * @since 0.1
	 */
	public iKnodeClientException(final Throwable thr)
	{
		super(thr);
	}
	
	/**
	 * Creates a new instance of the {@link iKnodeClientException} class.
	 * 
	 * @param message Exception message.
	 * @param thr Inner exception.
	 * @since 0.1
	 */
	public iKnodeClientException(final String message, final Throwable thr)
	{
		super(message, thr);
	}
}
