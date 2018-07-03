package com.cathay.api.service;

import javax.xml.soap.SOAPBody;
import javax.xml.soap.SOAPEnvelope;
import javax.xml.soap.SOAPException;
import javax.xml.soap.SOAPHeader;
import javax.xml.soap.SOAPMessage;
import javax.xml.soap.SOAPPart;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.ws.WebServiceMessage;
import org.springframework.ws.client.core.WebServiceMessageCallback;
import org.springframework.ws.client.core.WebServiceTemplate;
import org.springframework.ws.soap.saaj.SaajSoapMessage;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.cathay.api.bean.GiftRequest;
import com.cathay.api.exception.InternalServerException;
import com.cathay.api.msg.gift.req.GiftReq;
import com.cathay.api.msg.gift.req.GiftReq.MwHeader;
import com.cathay.api.msg.gift.req.GiftReq.Tranrq;
import com.cathay.api.msg.gift.req.GiftRequestParamXml;
import com.cathay.api.ods.gift.GetGiftData;
import com.cathay.api.ods.gift.GetGiftDataResponse;
import com.cathay.api.utility.XmlStringConverter;

@Service
public class GiftService {
	
	private static final Logger LOGGER = LogManager.getLogger(GiftService.class);
	private static final String LOGGER_START = "[START @{} ({})]";
	private static final String LOGGER_END = "[END @{} ({})]";	
	private static final String URL_SOURCE = "Data Source URL: ";
	
	private static final String GIFT_MSG_ID = "MISMMO0001";

	@Value("${client.ods.uri.gift}")
	private String giftUri;
	
	@Autowired
	WebServiceTemplate giftWebServiceTemplate;
	
	private com.cathay.api.ods.gift.ObjectFactory giftObjectactory = new com.cathay.api.ods.gift.ObjectFactory ();

	public String getGiftResponseData(GiftRequest giftRequest) throws InternalServerException {
		LOGGER.info(LOGGER_START, 
				this.getClass().getSimpleName(),
				Thread.currentThread().getStackTrace()[1].getMethodName());
		
		GetGiftData request = null;
		GetGiftDataResponse response = null;
		String responseData = null;
		try {
			GiftReq data = new GiftReq();
			Tranrq tranrq = new Tranrq();
			GiftRequestParamXml paramXml = new GiftRequestParamXml();
			
			tranrq.setIdNo(giftRequest.getCustomerId());
			data.setTranrq(tranrq);
			
			MwHeader mwHeader = new MwHeader();
			mwHeader.setMsgId(GIFT_MSG_ID); 
			mwHeader.setTxnSeq(giftRequest.getTransactionSequence());
			mwHeader.setReturnCode("");
			mwHeader.setReturnDesc("");
			data.setMwHeader(mwHeader);
			
			paramXml.setCubxml(data);
			
			request = giftObjectactory.createNEWACTISELXML();
			
			request.setParaXml(XmlStringConverter.toString(paramXml));

			response = (GetGiftDataResponse) giftWebServiceTemplate.marshalSendAndReceive(giftUri, request, new WebServiceMessageCallback() {				 
				public void doWithMessage(WebServiceMessage message) {
					final String PREFIX = "soapenv";
					final String TEM_PREFIX = "tem";
					SaajSoapMessage saajSoapMessage = (SaajSoapMessage)message;

		    		try {    		
			    		SOAPMessage soapMessage = saajSoapMessage.getSaajMessage();
			    		SOAPPart soapPart = soapMessage.getSOAPPart();
			    		SOAPEnvelope envelope = soapPart.getEnvelope();
			    		SOAPHeader header = soapMessage.getSOAPHeader();
			    		SOAPBody body = soapMessage.getSOAPBody();
			    		
			    		envelope.removeNamespaceDeclaration(envelope.getPrefix());
			    		
			    		envelope.addNamespaceDeclaration(PREFIX, "http://www.w3.org/2003/05/soap-envelope");
			    		envelope.addNamespaceDeclaration(TEM_PREFIX, "http://tempuri.org/");	
			    		
			    		envelope.setPrefix(PREFIX);   			
			    		header.setPrefix(PREFIX);    			
			    		body.setPrefix(PREFIX);	
			    		
			    		
			    		NodeList nList = body.getElementsByTagName("tem:NEWACTI_SEL_XML");
			            for (int i = 0; i < nList.getLength(); i++) 
			            {
			                Node nNode = nList.item(i);
			                Element eElement = (Element) nNode;
			                eElement.removeAttribute("xmlns");
			                
			            }
		    		}
		    		catch(SOAPException e) {
		    			LOGGER.error(URL_SOURCE + e.getMessage(), e);
		    		}
				}
			});

			responseData = response.getGetGiftDataResponse().getString();

		} catch (Exception e) {
			LOGGER.error(URL_SOURCE + e.getMessage(), e);	
			throw new InternalServerException(giftUri, e);
		}
		
		LOGGER.info(LOGGER_END, 
				this.getClass().getSimpleName(),
				Thread.currentThread().getStackTrace()[1].getMethodName());
		
		return responseData;
	}
}
