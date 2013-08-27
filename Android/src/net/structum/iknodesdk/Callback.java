package net.structum.iknodesdk;

import java.util.concurrent.Callable;

/**
 * Represents a Task Callback.
 *
 * Normally used to defer execution depending on another's Task result. The callback
 * has an underlying value, that eventually will be passed to the function to be called,
 * we can call it the callback argument.
 *
 * @author jgemedina
 *
 * @param <T> Type of the Callback underlying value.
 */
public class Callback<T> implements Callable<T> {	
	/**
	 * Callback argument
	 */
	private T _result;

	/**
	 * Sets the Callback argument.
     *
	 * @param result Callback argument.
	 */
	public void setResult(T result) {
		this._result = result;
	}
	
	/**
	 * Gets the callback argument.
     *
     * @return Callback argument.
	 */
	public T getResult() {
		return this._result;
	}
	
	/**
	 * Calls the function.
	 */
	public T call() {
		return null;
	}
}
