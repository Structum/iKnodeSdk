//
//  iKnodeSdkTests.m
//  iKnodeSdkTests
//
//  Created by Alex Espinoza on 11/17/12.
//  Copyright (c) 2012 Structum, Inc. All rights reserved.
//

#import "ApplicationClientTest.h"
#import "ApplicationClient.h"

@implementation ApplicationClientTest

- (void)setUp
{
    [super setUp];
}

- (void)tearDown
{
    [super tearDown];
}

- (void)testExecute_NoParamsTest
{
    ApplicationClient *client = [[ApplicationClient alloc] initWithServiceUrl:BaseUrl
                                                                    AndUserId:UserId
                                                                    AndApiKey:ApiKey
                                                                   AndAppName:@"UserService"];
    
    NSData *data = [client ExecuteWithMethodName:@"GetMostCommonFirstName" AndParameters:nil];
    
    NSString *actual = [[NSString alloc]initWithData:data encoding:NSUTF8StringEncoding];
    NSString *expected = @"John";
    
    STAssertEqualObjects(expected,
                         actual,
                         @"We expected %@, but it was %@",expected,actual);
}

- (void)testExecute_withParamsTest
{
    ApplicationClient *client = [[ApplicationClient alloc] initWithServiceUrl:BaseUrl
                                                                    AndUserId:UserId
                                                                    AndApiKey:ApiKey
                                                                   AndAppName:@"UserService"];
    
    NSDictionary *params = [NSDictionary dictionaryWithObject:@"2" forKey:@"id"];   
    NSData *data = [client ExecuteWithMethodName:@"GetFirstNameById" AndParameters:params];

    NSString *actual = [[NSString alloc]initWithData:data encoding:NSUTF8StringEncoding];    
    NSString *expected = @"Robert";
    
    STAssertEqualObjects(expected,
                         actual,
                         @"We expected %@, but it was %@",expected,actual);
}

- (void)testExecute_ComplexObject_NoParamsTest
{
    ApplicationClient *client = [[ApplicationClient alloc] initWithServiceUrl:BaseUrl
                                                                    AndUserId:UserId
                                                                    AndApiKey:ApiKey
                                                                   AndAppName:@"UserService"];
    
    NSData *data = [client ExecuteWithMethodName:@"CreateDefault" AndParameters:nil];
    
    // Expected Values.
    NSDictionary *fullName = [NSDictionary dictionaryWithObjectsAndKeys:
                              @"Jane", @"FirstName",
                              @"Doe", @"LastName",
                              nil];
    NSDictionary *expectedDictionary = [NSDictionary dictionaryWithObjectsAndKeys:
                              @2, @"Id",
                              fullName, @"Name",
                              nil];
    
    // Tests.
    NSDictionary *actualDictionary = (NSDictionary *) data;
    
    NSString *actual = [actualDictionary objectForKey:@"Id"];
    NSString *expected = [expectedDictionary objectForKey:@"Id"];
    STAssertEqualObjects(expected, actual, @"We expected %@, but it was %@",expected, actual);
    
    NSDictionary *actualFullName = [actualDictionary objectForKey:@"Name"];
    NSDictionary *expectedFullName = [expectedDictionary objectForKey:@"Name"];
    
    STAssertEqualObjects([expectedFullName objectForKey:@"FirstName"], [actualFullName objectForKey:@"FirstName"], @"");
    STAssertEqualObjects([expectedFullName objectForKey:@"LastName"], [actualFullName objectForKey:@"LastName"], @"");
}

@end
