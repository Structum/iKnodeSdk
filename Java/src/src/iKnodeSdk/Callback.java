package iKnodeSdk;

import java.util.concurrent.Callable;

/**
 * 
 * @author jgemedina
 *
 * @param <T>
 */
public class Callback<T> implements Callable<T> {	
	/**
	 * 
	 */
	private T _result;

	/**
	 * 
	 * @param result
	 */
	public void setResult(T result) {
		this._result = result;
	}
	
	/**
	 * 
	 */
	public T getResult() {
		return this._result;
	}
	
	/**
	 * 
	 */
	public T call() {
		return null;
	}
}
