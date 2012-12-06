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

- (NSData *) ExecuteWithMethodName:(NSString *)methodName AndParameters:(NSDictionary *)params
{
    NSData *body = nil;
    NSString *contentType = @"application/json";

    NSURL *appUrl = [NSURL URLWithString:[NSString stringWithFormat:@"%@/Applications/execute/%@/%@", _serviceUrl, _appName, methodName]];
    
	NSString *paramsJson = [self FormatParameters:params];
    
	body = [paramsJson dataUsingEncoding:NSUTF8StringEncoding];
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
    if(!urlData) {
        NSLog(@"%@", error);
    }
    
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
	NSMutableString *paramsJson = [[[NSMutableString alloc] initWithString:@"{ \"parameters\" :\"{"] autorelease];
    
	int index = 0;
	int count = [paramsDictionary count];
	for(NSString* key in paramsDictionary) {
		id value = [paramsDictionary objectForKey:key];
		
		if(value == nil) {
			continue;
		}

        NSString *paramValue;
        
        if (![self IsPrimitiveType:value]) {
            NSData *jsonData = [NSJSONSerialization dataWithJSONObject:value options:0 error:&error];
            
            if(!jsonData) {
                NSLog(@"ERROR: %@", error);
            }
            
            NSString *temp = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
			paramValue = [self ReplacePattern:@"\"" InText:temp WithReplacement:@"\\\\\""];
        } else {
            paramValue = [NSString stringWithFormat: @"%@", (NSString *)value];
        }

		[paramsJson appendString:[NSString stringWithFormat: @" %@:'%@'", key, paramValue]];

		if(++index < count) {
			[paramsJson appendString:@","];
		}
	}

	[paramsJson appendString:@"}\" }"];

	return [NSString stringWithString:paramsJson];
}

- (BOOL) IsPrimitiveType:(id)obj
{
    return ![obj isKindOfClass:[NSDictionary class]];
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
