package iKnodeSdk.tests;

import iKnodeSdk.ApplicationClient;
import iKnodeSdk.Callback;
import iKnodeSdk.MethodParameter;
import iKnodeSdk.Task;

public final class ExecAsyncTest {
	
	/**
	 * 
	 */
	private static ApplicationClient _client;
	
	/**
	 * 
	 */
	private static Callback<User> _callback;
	
	static {
		_client = new ApplicationClient(
				"73c1ccf9-13e1-4428-b5fc-4a8388d3552a",
				"e75aed47-f8f9-4df6-b409-707d7b0f7820", "UserService");
		
		_callback = new Callback<User>() {
			@Override
			public User call() {
				User result = this.getResult();
				System.out.println(String.format("User ID %s", result.Id));

				return result;
			}
		};		
	}

	/**
	 * @param args
	 * @throws InterruptedException
	 */
	public static void main(String[] args) throws InterruptedException {
		testAsyncMethodWithoutArgs();
		testAsyncMethodWithArgs();
	}

	/**
	 * 
	 */
	private static void testAsyncMethodWithoutArgs() {
		Task<User> task = _client.executeAsync(User.class, _callback, "CreateDefault");
		task.execute();
	}

	/**
	 * 
	 */
	private static void testAsyncMethodWithArgs() {
		Task<User> task = _client.executeAsync(User.class, _callback, "Create",
				new MethodParameter("id", 2010), new MethodParameter("name",
						new FullName("Enrique", "Medina")));
		task.execute();
	}
}
