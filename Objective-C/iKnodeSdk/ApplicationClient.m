//
//  ApplicationClient.m
//  iKnodeSdk
//
//  Created by Alex Espinoza on 11/17/12.
//  Copyright (c) 2012 Structum, Inc. All rights reserved.
//

#import "ApplicationClient.h"
#import "JSONKit.h"

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

- (NSData *) ExecuteWithMethodName:(NSString *)methodName AndParameters:(NSDictionary *)params
{
    NSData *body = nil;
    NSString *contentType = @"application/json";

    NSURL *appUrl = [NSURL URLWithString:[NSString stringWithFormat:@"%@/Applications/execute/%@/%@", _serviceUrl, _appName, methodName]];
    
    NSString *paramsJson = [self FormatParameters:params];
    
	body = [[NSString stringWithFormat:@"%@", paramsJson] dataUsingEncoding:NSUTF8StringEncoding];
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
    NSData *urlData = [NSURLConnection sendSynchronousRequest:request
											returningResponse:&response
														error:&error];
    
    NSString *data = [[NSString alloc]initWithData:urlData encoding:NSUTF8StringEncoding];
    data = [self CleanResult:data];

    return [self DeserializeParams:data];
}

- (NSString *) FormatParameters:(NSDictionary *) paramsDictionary
{   
	if(paramsDictionary == nil) {
		return @"{ \"parameters\" :\"\" }";
	}

	NSError *error;
	NSData *jsonData = [NSJSONSerialization dataWithJSONObject:paramsDictionary 
													   options:0
														 error:&error];

	if(!jsonData) {
		NSLog(@"ERROR: %@", error);
		return @"{ \"parameters\" :\"\" }";
	}

	NSString *paramsJson = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];

	NSString *modifiedString = [self ReplacePattern:@"\"" InText:paramsJson WithReplacement:@"\\\\\""];

	return [NSString stringWithFormat:@"{ \"parameters\" :\"%@\" }", modifiedString];
}

- (NSString *) CleanResult:(NSString *)result
{
	
	NSString *temp = [self ReplacePattern:@"^\"|\"$" InText:result WithReplacement:@""];
	NSString *cleanString = [self ReplacePattern:@"\\\\\"" InText:temp WithReplacement:@"\""];

    return cleanString;
}

- (NSData *) DeserializeParams:(NSString *)paramsJson
{
    NSData *jsonData = [paramsJson dataUsingEncoding:NSUTF8StringEncoding];

    NSError *error;
    NSData *result = [NSJSONSerialization JSONObjectWithData:jsonData
													 options:kNilOptions
													   error:&error];
	if(result) {
		return result;
	}

	NSString *cleanString = [self ReplacePattern:@"^\"|\"$" InText:paramsJson WithReplacement:@""];
	return [cleanString dataUsingEncoding:NSUTF8StringEncoding];
}

- (NSString *) ReplacePattern:(NSString *)pattern InText:(NSString *)text WithReplacement:(NSString *)replacement
{
    NSError *error;
    NSRegularExpression *regex = [NSRegularExpression regularExpressionWithPattern:pattern
																		   options:NSRegularExpressionCaseInsensitive 
																			 error:&error];

    NSString *temp = [regex stringByReplacingMatchesInString:text 
													 options:0 
													   range:NSMakeRange(0, [text length]) 
												withTemplate:replacement];

	return temp;
}
@end
