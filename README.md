# iKnode Software Development Kit

The iKnode Software DEvelopment Kit (SDK) provides libraries and tools that developers can use to create applications that use the iKnode Backend Cloud Platform.

## Suported Languages

C#
Javascript 

## Running the Unit tests

Each platform SDK contains its own Unit Tests. In order to run them, you need to setup an iKnode account and publish the Test Application. The Test Application is called UserService.cs.txt and can be found in each platform's Unit Tests.

## iKnode SDK for .NET

You can download the latest version from the Github Downloads section or you can install the latest version using NuGet (https://nuget.org/packages/iKnodeSdk):

<code>
PM> Install-Package iKnodeSdk
</code>

<code>
// Creating User Id 1 with Name jdoe.
ApplicationClient helloWorldSvc = new ApplicationClient(
                              "https://api.iknode.com",
                              UserId,
                              ApiKey,
                              "HelloWorld");

string response = userSvc.Execute<string>(
                      "HelloYou",
                      new MethodParameter("yourName", "John Doe"));
</code>

## Javascript

 var helloWorldSvc = new iKnodeSdk.ApplicationClient({
      userId: USERID,
      apiKey: APIKEY,
      appName: "HelloWorld"
  });

  var response = helloWorldSvc.execute({
      methodName: "HelloYou",
      parameters: [{
              name: "yourName",
              value: "John Doe"
          }
      ]
  });