package iKnodeSdk;

/**
 * 
 * @author jgemedina
 *
 */
public final class Task<T> {
	/**
	 * 
	 */
	private Runnable _runnable;
	
	/**
	 * 
	 * @param r
	 */
	public Task(Runnable r) {
		this._runnable = r;
	}
		
	/**
	 * 
	 */
	public void execute() {
		Thread t = new Thread(this._runnable);
		t.start();
	}
}
