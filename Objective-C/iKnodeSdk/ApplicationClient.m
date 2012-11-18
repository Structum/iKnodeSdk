//
//  ApplicationClient.m
//  iKnodeSdk
//
//  Created by Alex Espinoza on 11/17/12.
//  Copyright (c) 2012 Structum, Inc. All rights reserved.
//

#import "ApplicationClient.h"

@implementation ApplicationClient
- (id) initWithServiceUrl:(NSString *)serviceUrl AndUserId:(NSString *)userId AndApiKey:(NSString *)apiKey AndAppName:(NSString *)appName
{
    self = [super init];
    if (self == nil) {
        return nil;
    }
    _serviceUrl = [serviceUrl copy];
    _userId = [userId copy];
    _apiKey = [apiKey copy];
    _appName = [appName copy];
    
    return self;
}

- (void)dealloc {
    [super dealloc];
}

- (NSData *) ExecuteWithMethodName:(NSString *)methodName AndParameters:(NSMutableDictionary *)params
{
    NSData *body = nil;
    NSString *contentType = @"application/json";

    NSURL *appUrl = [NSURL URLWithString:[NSString stringWithFormat:@"%@/Applications/execute/%@/%@", _serviceUrl, _appName, methodName]];
    
    NSString *paramsJson = @"{ \"parameters\" :\"\" }";
    
    body = [[NSString stringWithFormat:@"%@", paramsJson] dataUsingEncoding:  NSUTF8StringEncoding];
    NSString *putLength = [NSString stringWithFormat:@"%d",[body length]];
    
    NSMutableDictionary* headers = [[[NSMutableDictionary alloc] init] autorelease];
    [headers setValue:contentType forKey:@"Content-Type"];
    [headers setValue:_userId forKey:@"iKnode-UserId"];
    [headers setValue:_apiKey forKey:@"iKnode-ApiKey"];
    
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:appUrl
                                                        cachePolicy:NSURLRequestUseProtocolCachePolicy
                                                        timeoutInterval:60.0];
    
    [request setHTTPMethod:@"POST"];
    [request setAllHTTPHeaderFields:headers];
    [request setHTTPBody:body];
    [request setValue:putLength forHTTPHeaderField:@"Content-Length"];
    
    NSError *error;
    NSURLResponse *response;
    NSData *urlData=[NSURLConnection sendSynchronousRequest:request
                                          returningResponse:&response
                                                      error:&error];
    
    NSString *data = [[NSString alloc]initWithData:urlData encoding:NSUTF8StringEncoding];
    data = [self CleanResult:data];

    return [self DeserializeParams:data];
}

- (NSString *) CleanResult:(NSString *) result
{
    NSError *error = NULL;

    NSRegularExpression *regex = [NSRegularExpression regularExpressionWithPattern:@"^\"|\"$|\\\\\"" options:NSRegularExpressionCaseInsensitive error:&error];
    NSString *modifiedString = [regex stringByReplacingMatchesInString:result options:0 range:NSMakeRange(0, [result length]) withTemplate:@""];

    return modifiedString;
}

- (NSData *) DeserializeParams:(NSString *)paramsJson
{
    NSData *jsonData = [paramsJson dataUsingEncoding:NSUTF8StringEncoding];

    NSError *error;
    return [NSJSONSerialization JSONObjectWithData:jsonData
                                           options:NSJSONReadingMutableContainers
                                             error:&error];
}

@end
