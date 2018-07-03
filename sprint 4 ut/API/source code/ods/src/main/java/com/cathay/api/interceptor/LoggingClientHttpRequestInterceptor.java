package com.cathay.api.interceptor;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;


import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.ws.client.support.interceptor.ClientInterceptor;
import org.springframework.ws.context.MessageContext;


/**
 * Allows logging outgoing requests and the corresponding responses.
 * Requires the use of a {@link org.springframework.http.client.BufferingClientHttpRequestFactory} to log
 * the body of received responses.
 */
public class LoggingClientHttpRequestInterceptor implements ClientInterceptor {

	private static final Logger LOGGER = LogManager.getLogger(LoggingClientHttpRequestInterceptor.class);

    @Override
    public boolean handleRequest(MessageContext messageContext){
        return true;
    }
 
    @Override
    public boolean handleResponse(MessageContext messageContext) {
   
        return true;
    }
 
    @Override
    public boolean handleFault(MessageContext messageContext) {
        return true;
    }
 
    public void afterCompletion(MessageContext messageContext, Exception ex){  
    	try {
    		
    		ByteArrayOutputStream bos = new ByteArrayOutputStream();

    		ObjectOutputStream os = new ObjectOutputStream(bos);
    		os.reset();
    		os.writeBytes("\nRequest:\n");
    		messageContext.getRequest().writeTo(os);
    		
    		os.writeBytes("\nResponse:\n");
            messageContext.getResponse().writeTo(os);
            
    		os.flush();
 

            LOGGER.info(bos.toString());
            
    	} catch (IOException e) {
    		LOGGER.error("Can't read response and/or request");
		}   
    }
}
