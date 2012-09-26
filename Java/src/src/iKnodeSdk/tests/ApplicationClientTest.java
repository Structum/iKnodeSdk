package iKnodeSdk.tests;

import static org.junit.Assert.*;

import java.lang.reflect.Type;
import java.util.ArrayList;

import iKnodeSdk.ApplicationClient;
import iKnodeSdk.MethodParameter;
import iKnodeSdk.iKnodeClientException;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runners.Suite.SuiteClasses;

import com.google.gson.reflect.TypeToken;

/**
 * Test Case for the iKnode Sdk.
 * 
 * @author jgemedina
 */
@SuiteClasses(ApplicationClientTest.class)
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
	 * 
	 * @throws iKnodeClientException Thrown if any exception is raised during execution. 
	 */
	@Test
	public void execute_noParamsTest() throws iKnodeClientException
	{
		Type resultType = new TypeToken<String>(){}.getType();
		String result = this._client.execute(resultType, "GetMostCommonFirstName");
		
		assertEquals("John", result);
	}

	/**
	 * Tests the Execute using Complex Objects with no parameters Method.
	 * 
	 * @throws iKnodeClientException Thrown if any exception is raised during execution. 
	 */
	@Test
    public void execute_withParamsTest() throws iKnodeClientException
    {
		Type resultType = new TypeToken<String>(){}.getType();
        String result = this._client.execute(resultType, "GetFirstNameById", new MethodParameter("id", 1));

        assertEquals("Robert", result);
    }
	
	/**
	 * Tests the Execute using Complex Objects with no parameters Method.
	 * 
	 * @throws iKnodeClientException Thrown if any exception is raised during execution. 
	 */
    @Test
    public void execute_complexObject_noParamsTest() throws iKnodeClientException
    {
        User expected = new User(2, new FullName("Jane", "Doe"));
        
        Type resultType = new TypeToken<User>(){}.getType();
        User actual = this._client.execute(resultType, "CreateDefault");
        
        assertNotNull(actual);
        assertEquals(expected.Id, actual.Id);
        assertNotNull(actual.Name);
        
        assertEquals(expected.Name.FirstName, actual.Name.FirstName);
        assertEquals(expected.Name.LastName, actual.Name.LastName);        
    }
    
    /**
     * Tests the Execute using Complex Objects with no parameters Method.
     * 
     * @throws iKnodeClientException Thrown if any exception is raised during execution. 
     */
    @Test
    public void execute_complexObject_withParamsTest() throws iKnodeClientException
    {
        User expected = new User(1, new FullName("Alex", "Espinoza"));
        
        Type resultType = new TypeToken<User>(){}.getType();
        User actual = this._client.execute(resultType, "Create", new MethodParameter("id", expected.Id), new MethodParameter("name", expected.Name));
        
        assertNotNull(actual);
        assertEquals(expected.Id, actual.Id);
        assertNotNull(actual.Name);
        assertEquals(expected.Name.FirstName, actual.Name.FirstName);
        assertEquals(expected.Name.LastName, actual.Name.LastName);
    }
    
    /**
     * 
     * @throws iKnodeClientException
     */
    @Test
    public void execute_listOfComplexObjects_noParamsTest() throws iKnodeClientException
    {    	
    	Type t2 = new TypeToken<ArrayList<User>>(){}.getType();
    	
    	ArrayList<User> users = this._client.execute(t2, "GetList");
    	User firstExpected = new User(1, new FullName("Alex", "Espinoza"));
    	
    	assertNotNull(users);
    	assertTrue(users.size() > 0);
    	
    	User user = users.get(0);    	
    	assertEquals(firstExpected.Id, user.Id);
    	assertEquals(firstExpected.Name.FirstName, user.Name.FirstName);
    	assertEquals(firstExpected.Name.LastName, user.Name.LastName);
    }
}