/**
 * Defines the iKnodeSdk namespace.
 */
var iKnodeSdk = iKnodeSdk || {};

/**
 * Initializes a new instance of the Application Client class.
 * @param {Object} config Configuration for the Application Client. ({String} userId, {String} apiKey, {String} appName)
 */
iKnodeSdk.ApplicationClient = function(config) {
	iKnodeSdk.validateConfigProperty(config, "userId");
	iKnodeSdk.validateConfigProperty(config, "apiKey");
	iKnodeSdk.validateConfigProperty(config, "appName");

    this._userId = config.userId;
    this._apiKey = config.apiKey;
	this._appName = config.appName;
	this._serviceUrl = "https://api.iknode.com";
};

/**
 * Executes the method with the selected parameters for the current application.
 * @param {Object} config Configuration for the Execute method. ({String} methodName, {Array} parameters)
 * @return {Object} Result Object.
 */
iKnodeSdk.ApplicationClient.prototype.execute = function(config) {
	iKnodeSdk.validateConfigProperty(config, "methodName");

	return iKnodeSdk.ApplicationClient._executeRequest(this._serviceUrl, this._userId, this._apiKey, this._appName, config.methodName, config.parameters);
};

/**
 * Executes the method with the selected parameters for the current application.
 * @param {Obect} config Configuration for the ExecuteAsync method. ({String} methodName, {Array} parameters, {Function} callback)
 */
iKnodeSdk.ApplicationClient.prototype.executeAsync = function(config) {
	iKnodeSdk.validateConfigProperty(config, "methodName");

	iKnodeSdk.ApplicationClient._executeRequest(this._serviceUrl, this._userId, this._apiKey, this._appName, config.methodName, config.parameters, config.callback);
};

/**
 * Executes the method with the selected parameters for the current application.
 * @param {String} serviceUrl Service URL.
 * @param {String} userId User Identifier.
 * @param {String} apiKey API Key.
 * @param {String} appName Application Name.
 * @param {String} methodName Method Name.
 * @param {Array} parameters Parameters Array.
 * @param {Function} callback Callback Function (Optional).
 */
iKnodeSdk.ApplicationClient._executeRequest = function(serviceUrl, userId, apiKey, appName, methodName, parameters, callback) {
	var appSvcUrl = serviceUrl + "/Applications/execute/"+appName+"/"+methodName;

	var request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

	var isAsync = !(iKnodeSdk.isNull(callback));

    request.open("POST", appSvcUrl, isAsync);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("iKnode-UserId", userId);
    request.setRequestHeader("iKnode-ApiKey", apiKey);

    if (isAsync) {
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                callback(iKnodeSdk.ApplicationClient._deserializeObject(request.responseText));
            }
        };
    }

	var formattedParams = iKnodeSdk.ApplicationClient._formatParameters(parameters);

    request.send(formattedParams);

	if(!isAsync && !iKnodeSdk.isNull(request.responseText)) {
		return iKnodeSdk.ApplicationClient._deserializeObject(request.responseText);
	}

	return "";
};

/**
 * Deserializes the Selected Object.
 * @param {String} object Object to deserialize.
 * @return {Object} Deserialized Object.
 */
iKnodeSdk.ApplicationClient._deserializeObject = function(object) {
	return eval("(" + iKnodeSdk.ApplicationClient._cleanResult(object) + ")");
};

/**
 * Cleans the Executon Result String.
 * @param {String} result Execution Result String to clean.
 * @return {String} Clean Result String.
 */
iKnodeSdk.ApplicationClient._cleanResult = function(result) {
	return result.trim().replace(/^"|"$/g, "").replace(/\\\"/g, '"');
};

/**
 * Formats the parameter array to be used for the JSON REST command.
 * @param {Array} parameters Parameter Array.
 * @return Formatted Parameter String.
 */
iKnodeSdk.ApplicationClient._formatParameters = function(parameters) {
	var formattedParams = "{ \"parameters\": \"{";

	var count = (iKnodeSdk.isNull(parameters) ? 0 : parameters.length);
	for(var index = 0; index < count; index++) {
		var parameter = parameters[index];
		var paramValue = parameter.value;

        if(!iKnodeSdk.isPrimitiveType(paramValue)) {
            paramValue = JSON.stringify(paramValue);
			paramValue = paramValue.replace(/"/g, "\\\"");
        } else if(iKnodeSdk.isString(paramValue)) {
			paramValue = paramValue.replace(/"/g, "\\\"");
			paramValue = paramValue.replace(/'/g, "\\\'");
		}

		formattedParams += " "+parameter.name+":'"+paramValue+"'";

        if(index + 1 < count) {
			formattedParams += ",";
		}
	}

    formattedParams += "}\" }";

	return formattedParams;
};

/**
 * Returns true if the object is null, false otherwise.
 * @param {Object} object Object to validate.
 * @return {Boolean} True if the object is null, false otherwise.
 */
iKnodeSdk.isNull = function(object) {
    return null === object || typeof(object) === "undefined";
};

/**
 * Validates the selected object.
 * @param {Object} object object to validate.
 * @param {String} objectName OBject's Name.
 */
iKnodeSdk.validate = function(object, objectName) {
	if(iKnodeSdk.isNull(object)) {
		if(iKnodeSdk.isNull(objectName)) {
			objectName = "object";
		}

		throw "The provided "+objectName+" is empty or invalid.";
	}
};

/**
 * Validates the selected config property.
 * @param {Object} config Configuration Object.
 * @param {String} propertyName Property Name to check.
 */
iKnodeSdk.validateConfigProperty = function(config, propertyName) {
    if (!(config.hasOwnProperty(propertyName))) {
        throw "The provided configuration didn't include the following required property:"+propertyName;
    }
};

/**
 * Returns true if the object is of primitive type, false otherwise.
 * @param {Object} object Object to validate.
 * @return {Boolean} True if the object is of primitive type, false otherwise.
 */
iKnodeSdk.isPrimitiveType = function(variable) {
	var varAsString = Object.prototype.toString.call(variable);

	var isArray = (varAsString == '[object Array]');
	var isObject = variable === Object(variable);
	var isFunction = (varAsString == '[object Function]');

	return !(isArray || isObject || isFunction);
};

iKnodeSdk.isString = function (obj) {
  return Object.prototype.toString.call(obj) == '[object String]';
};
