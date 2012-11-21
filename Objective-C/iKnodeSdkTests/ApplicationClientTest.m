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
NSString *const UserId = @"";
NSString *const ApiKey = @"";
NSString *const BaseUrl = @"https://api.iknode.com/";

- (void)setUp
{
    [super setUp];
}

- (void)tearDown
{
    [super tearDown];
}

- (void)Execute_NoParamsTest
{
    ApplicationClient *client = [[ApplicationClient alloc] initWithServiceUrl:BaseUrl
                                                                    AndUserId:UserId
                                                                    AndApiKey:ApiKey
                                                                   AndAppName:@"UserService"];
    
    NSString *actual = [client ExecuteWithMethodName:@"GetMostCommonFirstName" AndParameters:nil];
    
    NSString *expected = @"John";
    STAssertEqualObjects(expected,
                         actual,
                         @"We expected %@, but it was %@",expected,actual);
}

- (void)Execute_withParamsTest
{
    ApplicationClient *client = [[ApplicationClient alloc] initWithServiceUrl:BaseUrl
                                                                    AndUserId:UserId
                                                                    AndApiKey:ApiKey
                                                                   AndAppName:@"UserService"];
    
    NSMutableDictionary *params = [[[NSMutableDictionary alloc] init] autorelease];
    [params setValue:@"2" forKey:@"Id"];
    [params setValue:@"2" forKey:@"Name"];
    
    NSString *actual = [client ExecuteWithMethodName:@"GetMostCommonFirstName" AndParameters:nil];
    
    NSString *expected = @"Robert";
    STAssertEqualObjects(expected,
                         actual,
                         @"We expected %@, but it was %@",expected,actual);
}

- (void)Execute_ComplexObject_NoParamsTest
{
    ApplicationClient *client = [[ApplicationClient alloc] initWithServiceUrl:BaseUrl
                                                                    AndUserId:UserId
                                                                    AndApiKey:ApiKey
                                                                   AndAppName:@"UserService"];

    NSMutableDictionary *fullName = [[[NSMutableDictionary alloc] init] autorelease];
    [fullName setValue:@"Jane" forKey:@"FirstName"];
    [fullName setValue:@"Doe" forKey:@"LstName"];
    
    NSMutableDictionary *params = [[[NSMutableDictionary alloc] init] autorelease];
    [params setValue:@"1" forKey:@"id"];
    [params setValue:fullName forKey:@"Name"];
    
    NSMutableDictionary *actual = [client ExecuteWithMethodName:@"CreateDefault" AndParameters:params];
    
    /*STAssertEqualObjects(expected,
                         actual,
                         @"We expected %@, but it was %@",expected,actual);*/
}

@end
