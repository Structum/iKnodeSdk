package net.structum.iknodesdk;

/**
 * Defines an iKnode Task.
 *
 * A Task is made of two parts, and Application and some method in it.
 *
 * @author jgemedina
 *
 */
public final class Task<T> {
	/**
	 * Runnable wrapper
	 */
	private Runnable _runnable;
	
	/**
	 * Creates a new instance of a Task
     *
	 * @param r Runnable Task.
	 */
	public Task(Runnable r) {
		this._runnable = r;
	}
		
	/**
	 * Executes the Task
	 */
	public void execute() {
		Thread t = new Thread(this._runnable);
		t.start();
	}
}
