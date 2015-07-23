/**
 * Defines the iKnodeSdk namespace.
 */
var iKnodeSdk = iKnodeSdk || {};

iKnodeSdk.ServiceUrl = "https://api.iknode.com";

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

	this._serviceUrl = iKnodeSdk.ServiceUrl;
	if(config.serviceUrl) {
		this._serviceUrl = config.serviceUrl;
	}
};

/**
 * Executes the method with the selected parameters for the current application.
 * @param {Object} config Configuration for the Execute method. ({String} methodName, {Array} parameters)
 * @return {Object} Result Object.
 */
iKnodeSdk.ApplicationClient.prototype.execute = function(config) {
	iKnodeSdk.validateConfigProperty(config, "methodName");

	if(!config.hasOwnProperty("formatParameters")) {
		config.formatParameters = false;
	}

	return iKnodeSdk.ApplicationClient._executeRequest(this._serviceUrl, this._userId, this._apiKey, this._appName, config.methodName, config.parameters, config.formatParameters);
};

/**
 * Executes the method with the selected parameters for the current application.
 * @param {Obect} config Configuration for the ExecuteAsync method. ({String} methodName, {Array} parameters, {Function} callback)
 */
iKnodeSdk.ApplicationClient.prototype.executeAsync = function(config) {
	iKnodeSdk.validateConfigProperty(config, "methodName");

	if(!config.hasOwnProperty("formatParameters")) {
		config.formatParameters = false;
	}

	iKnodeSdk.ApplicationClient._executeRequest(this._serviceUrl, this._userId, this._apiKey, this._appName, config.methodName, config.parameters, config.formatParameters, config.callback);
};

/**
 * Executes the method with the selected parameters for the current application.
 * @param {String} serviceUrl Service URL.
 * @param {String} userId User Identifier.
 * @param {String} apiKey API Key.
 * @param {String} appName Application Name.
 * @param {String} methodName Method Name.
 * @param {Object} parameters Parameters Array.
 * @param {Boolean} formatParameters True to format parameters from the old Array to Object, false otherwise.
 * @param {Function} callback Callback Function (Optional).
 */
iKnodeSdk.ApplicationClient._executeRequest = function(serviceUrl, userId, apiKey, appName, methodName, parameters, formatParameters, callback) {
	var appSvcUrl = serviceUrl + "/v3/" + userId + "/" + appName + "/" + methodName;

	var params = parameters;
	if(formatParameters) {
		params = iKnodeSdk.ApplicationClient._formatParameters(params);
	}

	var request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

	var isAsync = !(iKnodeSdk.isNull(callback));

    request.open("POST", appSvcUrl, isAsync);
    request.setRequestHeader("Content-Type", "application/json");

	if(!iKnodeSdk.isNull(apiKey) && apiKey != "") {
		request.setRequestHeader("iKnode-ApiKey", apiKey);
	}

    if (isAsync) {
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
				callback(iKnodeSdk.deserializeObject(request.responseText), request);
            }
        };
    }

	var formattedParams = JSON.stringify(params);

    request.send(formattedParams);

	if(!isAsync && !iKnodeSdk.isNull(request.responseText)) {
		return iKnodeSdk.deserializeObject(request.responseText);
	}

	return "";
};

/**
 * Deserializes the Selected Object.
 * @param {String} object Object to deserialize.
 * @return {Object} Deserialized Object.
 */
iKnodeSdk.DeserializeObject = function(object) {
	var result = iKnodeSdk.ApplicationClient._cleanResult(object);

	return (iKnodeSdk.isJson(result) ? JSON.parse(result) : result);
};

/**
 * Cleans the Executon Result String.
 * @param {String} result Execution Result String to clean.
 * @return {String} Clean Result String.
 */
iKnodeSdk.ApplicationClient._cleanResult = function(result) {
	return result.trim().replace('<string xmlns="http://schemas.microsoft.com/2003/10/Serialization/">', "")
	                    .replace("</string>", "")
						.replace(/^"|"$/g, "")
						.replace('""', "")
						.replace(/\\\"/g, '"');
};

/**
 * Formats the parameter array to be used for the JSON REST command.
 * @param {Array} parameters Parameter Array.
 * @return Formatted Parameter String.
 */
iKnodeSdk.ApplicationClient._formatParameters = function(parameters) {
	var params = "{";
	var count = (iKnodeSdk.isNull(parameters) ? 0 : parameters.length);
	for(var index = 0; index < count; index++) {
		var parameter = parameters[index];
		var fieldName = parameter.name;
		var fieldValue = parameter.value;

		fieldValue = JSON.stringify(fieldValue);

		params += "\""+fieldName+"\": "+fieldValue;

		if(index+1 < count) {
			params += ",";
		}
	}

    params += "}";

	return JSON.parse(params);
};

/**
 * Initializes a new instance of the Application Client class.
 * @param {Object} config Configuration for the Application Client. ({String} userId, {String} apiKey, {String} appName)
 */
iKnodeSdk.DataClient = function(config) {
	iKnodeSdk.validateConfigProperty(config, "userId");
	iKnodeSdk.validateConfigProperty(config, "apiKey");
	iKnodeSdk.validateConfigProperty(config, "collectionName");

    this._userId = config.userId;
    this._apiKey = config.apiKey;
	this._collectionName = config.collectionName;

	this._serviceUrl = iKnodeSdk.ServiceUrl;
	if(config.serviceUrl) {
		this._serviceUrl = config.serviceUrl;
	}
};

/**
 * Imports a CSV string content.
 * @param {String} csv String containing the Comma delimited dataset.
 * @param {Array} objKeys List of Object Key Column names that identify a unique record.
 * @param {Function} callback Callback Function (Optional).
 * @return Number of documents merged (Created/Updated).
 */
iKnodeSdk.DataClient.prototype.importCsv = function(contents, objKeys, callback) {
	return this._import("Csv", contents, objKeys, callback);
};

/**
 * Imports a JSON string content.
 * @param {String} json String containing the JSON dataset.
 * @param {Array} objKeys List of Object Key Column names that identify a unique record.
 * @param {Function} callback Callback Function (Optional).
 * @return Number of documents merged (Created/Updated).
 */
iKnodeSdk.DataClient.prototype.importJson = function(contents, objKeys, callback) {
	return this._import("Json", contents, objKeys, callback);
};

/**
 * Imports a CSV or JSON dataset.
 * @param {String} type Dataset type, either 'Csv' or 'Json'.
 * @param {String} contents String containing the dataset contents.
 * @param {Array} objKeys List of Object Key Column names that identify a unique record.
 * @param {Function} callback Callback Function (Optional).
 * @return Number of documents merged (Created/Updated).
 */
iKnodeSdk.DataClient.prototype._import = function(type, contents, objKeys, callback) {
	var dataSvcUrl = this._serviceUrl + "/v3/data/" + this._userId + "/" + this._collectionName;
	var body = contents;
	var isAsync = !(iKnodeSdk.isNull(callback));

	var request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

    request.open("POST", dataSvcUrl, isAsync);
    request.setRequestHeader("Content-Type", "application/json");

	if(!iKnodeSdk.isNull(this._apiKey) && this._apiKey != "") {
		request.setRequestHeader("iKnode-ApiKey", this._apiKey);
	}

	if(!iKnodeSdk.isNull(objKeys) && objKeys.length > 0) {
		request.setRequestHeader("iKnode-ObjectKeys", objKeys);
	}

	request.setRequestHeader("iKnode-Content-Type", type);

    if (isAsync) {
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
				callback(iKnodeSdk.deserializeObject(request.responseText), request);
            }
        };
    }

    request.send(body);

	if(!isAsync && !iKnodeSdk.isNull(request.responseText)) {
		return iKnodeSdk.deserializeObject(request.responseText);
	}

	return "";
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

/**
 * Returns true if the selected Object is a string.
 * @param {Object} object Object to validate.
 * @return {Boolean} True if the object is a string, false otherwise.
 */
iKnodeSdk.isString = function (obj) {
  return Object.prototype.toString.call(obj) == '[object String]';
};

/**
 * Returns true if the selected Object is json.
 * @param {Object} object Object to validate.
 * @return {Boolean} True if the object is json, false otherwise.
 */
iKnodeSdk.isJson = function(obj) {
	if(obj == "") {
		return false;
	}

	return (/^[\],:{}\s]*$/.test(obj.replace(/\\["\\\/bfnrtu]/g, '@')
								    .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
									.replace(/(?:^|:|,)(?:\s*\[)+/g, '')));
};

			/**
 * Deserializes the Selected Object.
 * @param {String} object Object to deserialize.
 * @return {Object} Deserialized Object.
 */
iKnodeSdk.deserializeObject = function(object) {
	var result = iKnodeSdk.ApplicationClient._cleanResult(object);

	return (iKnodeSdk.isJson(result) ? JSON.parse(result) : result);
};
