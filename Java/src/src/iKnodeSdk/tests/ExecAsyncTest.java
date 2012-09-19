package iKnodeSdk.tests;

import iKnodeSdk.ApplicationClient;
import iKnodeSdk.Callback;
import iKnodeSdk.MethodParameter;
import iKnodeSdk.Task;

public final class ExecAsyncTest {

	/**
	 * @param args
	 * @throws InterruptedException 
	 */
	public static void main(String[] args) throws InterruptedException {
		ApplicationClient client = new ApplicationClient("73c1ccf9-13e1-4428-b5fc-4a8388d3552a", "e75aed47-f8f9-4df6-b409-707d7b0f7820", "UserService");
		
		Callback<User> c = new Callback<User>() {
			@Override
			public User call() {
				User result = this.getResult();
				System.out.println(String.format("User ID %s", result.Id));
				
				return result;
			}
		};
		
		Task<User> task = client.executeAsync(User.class,
											  c,
											  "Create",
											  new MethodParameter("id", 2010),
											  new MethodParameter("name", 
													  			  new FullName("Enrique", "Medina")));
		task.execute();
	}
}
