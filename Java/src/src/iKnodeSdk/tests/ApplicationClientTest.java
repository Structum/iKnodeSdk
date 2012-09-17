package iKnodeSdk.tests;

import static org.junit.Assert.*;
import iKnodeSdk.ApplicationClient;
import iKnodeSdk.MethodParameter;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

/**
 * Test Case for the iKnode Sdk.
 * 
 * @author jgemedina
 */
public class ApplicationClientTest {

	/**
	 * Application Client instance.
	 */
	private ApplicationClient _client;
	
	/**
	 * Initialize test resources.
	 */
	@Before
	public void TestInitialize()
	{
		this._client = new ApplicationClient("73c1ccf9-13e1-4428-b5fc-4a8388d3552a", "e75aed47-f8f9-4df6-b409-707d7b0f7820", "UserService");
	}
	
	/**
	 * Dispose test resources.
	 */
	@After
	public void TestDispose()
	{
		this._client = null;
	}

	/**
	 * Tests the Execute with no parameters Method.
	 */
	@Test
	public void execute_noParamsTest()
	{
		String result = this._client.execute("GetMostCommonFirstName");
		
		assertEquals("John", result);
	}

	/**
	 * Tests the Execute using Complex Objects with no parameters Method.
	 */
	@Test
    public void execute_withParamsTest()
    {
        String result = this._client.execute("GetFirstNameById", new MethodParameter("id", 1));

        assertEquals("Robert", result);
    }
	
	/**
	 * Tests the Execute using Complex Objects with no parameters Method.
	 */
    @Test
    public void execute_complexObject_noParamsTest()
    {
        User expected = new User(2, new FullName("Jane", "Doe"));
        User actual = this._client.execute("CreateDefault");
        
        assertNotNull(actual);
        assertEquals(expected.getId(), actual.getId());
        assertNotNull(actual.getName());
        
        assertEquals(expected.getName().getFirstName(), actual.getName().getFirstName());
        assertEquals(expected.getName().getLastName(), actual.getName().getLastName());        
    }	
}
