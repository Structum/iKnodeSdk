//
//  ApplicationClient.h
//  iKnodeSdk
//
//  Created by Alex Espinoza on 11/17/12.
//  Copyright (c) 2012 Structum, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface ApplicationClient : NSObject
{
    NSString* _serviceUrl;
    NSString* _userId;
    NSString* _apiKey;
    NSString* _appName;
}

- (id) initWithServiceUrl:(NSString *)serviceUrl AndUserId:(NSString *)userId AndApiKey:(NSString *)apiKey AndAppName:(NSString *)appName;

- (NSString *) ExecuteWithMethodName:(NSString *)methodName AndParameters:(NSMutableDictionary *)params;
@end
