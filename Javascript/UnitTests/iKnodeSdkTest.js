USERID = '';
APIKEY = '';

// Backward compatibility tests.
test("Execute_NoParamsTest_WithFormatParams", function() {
	var userSvc = new iKnodeSdk.ApplicationClient({
		userId: USERID,
		apiKey: APIKEY,
		appName: "UserService"
	});

	var result = userSvc.execute({
		methodName: "GetMostCommonFirstName"
	});

	ok(result === "John");
});

test("Execute_withParamsTest_WithFormatParams", function() {
	var userSvc = new iKnodeSdk.ApplicationClient({
		userId: USERID,
		apiKey: APIKEY,
		appName: "UserService"
	});

	var result = userSvc.execute({
		methodName: "GetFirstNameById",
		formatParameters: true,
		parameters: [{
			name: "id",
			value: 1
			}
		]
	});

	ok(result === "Robert");
});

test("Execute_ComplexObject_NoParamsTest_WithFormatParams", function() {
	var userSvc = new iKnodeSdk.ApplicationClient({
		userId: USERID,
		apiKey: APIKEY,
		appName: "UserService"
	});

	var expected = {
		Id: 2,
		Name: {
			FirstName: "Jane",
			LastName: "Doe"
		}
	};

	var actual = userSvc.execute({
		methodName: "CreateDefault"
	});

	ok(!iKnodeSdk.isNull(actual));
	ok(expected.Id == actual.Id);

	ok(!iKnodeSdk.isNull(actual.Name));
	ok(expected.Name.FirstName == actual.Name.FirstName);
	ok(expected.Name.LastName == actual.Name.LastName);
});

test("Execute_ComplexObject_withParamsTest_WithFormatParams", function() {
	var userSvc = new iKnodeSdk.ApplicationClient({
		userId: USERID,
		apiKey: APIKEY,
		appName: "UserService"
	});

	var expected = {
		Id: 1,
		Name: {
			FirstName: "Alex",
			LastName: "Espinoza Esparza"
		}
	};

	var actual = userSvc.execute({
		methodName: "Create",
		formatParameters: true,
		parameters: [{
				name: "id",
				value: expected.Id
			},{
				name: "name",
				value: expected.Name
			}
		]
	});

	ok(!iKnodeSdk.isNull(actual));
	ok(expected.Id == actual.Id);

	ok(!iKnodeSdk.isNull(actual.Name));
	ok(expected.Name.FirstName == actual.Name.FirstName);
	ok(expected.Name.LastName == actual.Name.LastName);
});

asyncTest("ExecuteAsync_ComplexObject_withParamsTest_WithFormatParams", function() {
	var userSvc = new iKnodeSdk.ApplicationClient({
		userId: USERID,
		apiKey: APIKEY,
		appName: "UserService"
	});

	var expected = {
		Id: 1,
		Name: {
			FirstName: "Alex",
			LastName: "Espinoza Esparza"
		}
	};

	var callback = function(actual) {
		ok(!iKnodeSdk.isNull(actual));
		ok(expected.Id == actual.Id);

		ok(!iKnodeSdk.isNull(actual.Name));
		ok(expected.Name.FirstName == actual.Name.FirstName);
		ok(expected.Name.LastName == actual.Name.LastName);

		start();
	};

	var actual = userSvc.executeAsync({
		callback: callback,
		methodName: "Create",
		formatParameters: true,
		parameters: [{
				name: "id",
				value: expected.Id
			},{
				name: "name",
				value: expected.Name
			}
		]
	});
});

// NEw Format Tests
test("Execute_NoParamsTest", function() {
	var userSvc = new iKnodeSdk.ApplicationClient({
		userId: USERID,
		apiKey: APIKEY,
		appName: "UserService"
	});

	var result = userSvc.execute({
		methodName: "GetMostCommonFirstName"
	});

	ok(result === "John");
});

test("Execute_withParamsTest", function() {
	var userSvc = new iKnodeSdk.ApplicationClient({
		userId: USERID,
		apiKey: APIKEY,
		appName: "UserService"
	});

	var result = userSvc.execute({
		methodName: "GetFirstNameById",
		parameters: {
			id: 1
		}
	});

	ok(result === "Robert");
});

test("Execute_ComplexObject_NoParamsTest", function() {
	var userSvc = new iKnodeSdk.ApplicationClient({
		userId: USERID,
		apiKey: APIKEY,
		appName: "UserService"
	});

	var expected = {
		Id: 2,
		Name: {
			FirstName: "Jane",
			LastName: "Doe"
		}
	};

	var actual = userSvc.execute({
		methodName: "CreateDefault"
	});

	ok(!iKnodeSdk.isNull(actual));
	ok(expected.Id == actual.Id);

	ok(!iKnodeSdk.isNull(actual.Name));
	ok(expected.Name.FirstName == actual.Name.FirstName);
	ok(expected.Name.LastName == actual.Name.LastName);
});

test("Execute_ComplexObject_withParamsTest", function() {
	var userSvc = new iKnodeSdk.ApplicationClient({
		userId: USERID,
		apiKey: APIKEY,
		appName: "UserService"
	});

	var expected = {
		Id: 1,
		Name: {
			FirstName: "Alex",
			LastName: "Espinoza Esparza"
		}
	};

	var actual = userSvc.execute({
		methodName: "Create",
		parameters: {
			id: expected.Id,
			name: expected.Name
		}
	});

	ok(!iKnodeSdk.isNull(actual));
	ok(expected.Id == actual.Id);

	ok(!iKnodeSdk.isNull(actual.Name));
	ok(expected.Name.FirstName == actual.Name.FirstName);
	ok(expected.Name.LastName == actual.Name.LastName);
});

asyncTest("ExecuteAsync_ComplexObject_withParamsTest", function() {
	var userSvc = new iKnodeSdk.ApplicationClient({
		userId: USERID,
		apiKey: APIKEY,
		appName: "UserService"
	});

	var expected = {
		Id: 1,
		Name: {
			FirstName: "Alex",
			LastName: "Espinoza Esparza"
		}
	};

	var callback = function(actual) {
		ok(!iKnodeSdk.isNull(actual));
		ok(expected.Id == actual.Id);

		ok(!iKnodeSdk.isNull(actual.Name));
		ok(expected.Name.FirstName == actual.Name.FirstName);
		ok(expected.Name.LastName == actual.Name.LastName);

		start();
	};

	var actual = userSvc.executeAsync({
		callback: callback,
		methodName: "Create",
		parameters: {
			id: expected.Id,
			name: expected.Name
		}
	});
});