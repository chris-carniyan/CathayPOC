package com.cathay.api.config;


import org.apache.commons.lang.ArrayUtils;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.oxm.jaxb.Jaxb2Marshaller;
import org.springframework.ws.client.core.WebServiceTemplate;
import org.springframework.ws.client.support.interceptor.ClientInterceptor;
import org.springframework.ws.soap.SoapVersion;
import org.springframework.ws.soap.saaj.SaajSoapMessageFactory;

import com.cathay.api.interceptor.LoggingClientHttpRequestInterceptor;


@Configuration
public class ODSClientConfig {
	private static final String ROP_CONTEXT_PACKAGE = "com.cathay.api.ods.rop";
	private static final String GIFT_CONTEXT_PACKAGE = "com.cathay.api.ods.gift";
	
	@Bean
    @Qualifier("giftWebServiceTemplate")
	public WebServiceTemplate giftWebServiceTemplate() {
		
		WebServiceTemplate webServiceTemplate = new WebServiceTemplate();
		webServiceTemplate.setMessageFactory(odsMessageFactory());
		
		Jaxb2Marshaller jaxb2Marshaller = new Jaxb2Marshaller();
		jaxb2Marshaller.setContextPath(GIFT_CONTEXT_PACKAGE);
		
		webServiceTemplate.setMarshaller(jaxb2Marshaller);
		webServiceTemplate.setUnmarshaller(jaxb2Marshaller);
		
		// add logging interceptor
		ClientInterceptor[] interceptors = webServiceTemplate.getInterceptors();
		interceptors = (ClientInterceptor[]) ArrayUtils.add(interceptors, new LoggingClientHttpRequestInterceptor());
		webServiceTemplate.setInterceptors(interceptors);

		return webServiceTemplate;
	}

	@Bean
    @Qualifier("ropWebServiceTemplate")
	public WebServiceTemplate ropWebServiceTemplate() {
		WebServiceTemplate webServiceTemplate = new WebServiceTemplate();
		webServiceTemplate.setMessageFactory(odsMessageFactory());
		
		Jaxb2Marshaller jaxb2Marshaller = new Jaxb2Marshaller();
		jaxb2Marshaller.setContextPath(ROP_CONTEXT_PACKAGE);
		
		webServiceTemplate.setMarshaller(jaxb2Marshaller);
		webServiceTemplate.setUnmarshaller(jaxb2Marshaller);
		
		// add logging interceptor
		ClientInterceptor[] interceptors = webServiceTemplate.getInterceptors();
		interceptors = (ClientInterceptor[]) ArrayUtils.add(interceptors, new LoggingClientHttpRequestInterceptor());
		webServiceTemplate.setInterceptors(interceptors);

		return webServiceTemplate;
	}
	
	@Bean
	public SaajSoapMessageFactory odsMessageFactory(){
		// 使用SOAP 1.2就不用設定SOAP Action表頭
		SaajSoapMessageFactory factory = new SaajSoapMessageFactory();
		factory.setSoapVersion(SoapVersion.SOAP_12);
		
		return factory;
	}
}
