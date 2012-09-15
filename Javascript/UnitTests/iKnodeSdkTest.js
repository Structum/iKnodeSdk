USERID = '';
APIKEY = '';

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
		parameters: [{
			name: "id",
			value: 1
			}
		]
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
			LastName: "Espinoza"
		}
	};

	var actual = userSvc.execute({
		methodName: "Create",
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
			LastName: "Espinoza"
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