package com.cathay.api.service;

import java.util.ArrayList;
import java.util.List;

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

import com.cathay.api.bean.BaseRequest;
import com.cathay.api.exception.InternalServerException;
import com.cathay.api.rop.req.GetODSData;
import com.cathay.api.rop.req.GetODSDataReq;
import com.cathay.api.rop.req.GetODSDataReq.ODSQuery;
import com.cathay.api.rop.req.GetODSDataReq.ODSQuery.ParameterValue;
import com.cathay.api.rop.resp.GetODSDataResponse;
import com.cathay.api.utility.XmlStringConverter;

import com.cathay.api.rop.req.GetODSXmlString;

@Service
public class RecommendationService {
	
	private static final Logger LOGGER = LogManager.getLogger(RecommendationService.class);
	private static final String LOGGER_START = "[START @{} ({})]";
	private static final String LOGGER_END = "[END @{} ({})]";	
	private static final String URL_SOURCE = "Data Source URL: ";

	private static final String ROP_MSG_ID = "ODSCAMPAIGN0003";

	private com.cathay.api.ods.rop.ObjectFactory ropObjectactory = new com.cathay.api.ods.rop.ObjectFactory ();
	
	@Value("${client.ods.uri.recommendation}")
	private String recommendationUri;

	@Autowired
	private WebServiceTemplate ropWebServiceTemplate;
	
	
	
	public String getRecommendationData(BaseRequest recommendationRequest) throws InternalServerException {
		
		LOGGER.info(LOGGER_START, 
				this.getClass().getSimpleName(),
				Thread.currentThread().getStackTrace()[1].getMethodName());
		
		GetODSData request = null;
		GetODSDataResponse response = null;
		String responseData = null;
		try {

			StringBuilder sb = new StringBuilder();
			String apId = recommendationRequest.getHeader().getApId();
			
			if(apId == null || apId.length() != 10) {
				throw new IllegalArgumentException("Invalid ApId");
			}
				
			sb.append(apId.substring(0, 3));
			sb.append("-");
			sb.append(apId.substring(3, 5));
			sb.append("-");
			sb.append(apId.substring(5, 8));
			sb.append("-");
			sb.append(apId.substring(8, 10));
			
			GetODSDataReq cubxml = new GetODSDataReq();
			GetODSXmlString data = new GetODSXmlString();
			ODSQuery odsQuery = new ODSQuery();
			
			
			odsQuery.setXmlLen("200");
			odsQuery.setMsgId(ROP_MSG_ID);
			odsQuery.setRequestApId(sb.toString());
			odsQuery.setPackageSpName("DODSDWON.PK_CAMPAIGN_CHNL_CUST_LIST.Sp_get");
			odsQuery.setBranchCode(recommendationRequest.getHeader().getApId());
			odsQuery.setEmpCode(recommendationRequest.getHeader().getApId());
			ParameterValue parameterValue1 = new ParameterValue(1, "1");
			ParameterValue parameterValue2 = new ParameterValue(2, "S");
			ParameterValue parameterValue3 = new ParameterValue(3, recommendationRequest.getCustomerId());
			
			List<ParameterValue> spParameter = new ArrayList<>();
			spParameter.add(parameterValue1);
			spParameter.add(parameterValue2);
			spParameter.add(parameterValue3);
			
			odsQuery.setSpParameter(spParameter);
			
			cubxml.setOdsQuery(odsQuery);
	
			request = ropObjectactory.createGetODSData();
		
			data.setCUBXML(cubxml);
			
			request.setXMLSTRING(XmlStringConverter.toString(data));
	
			response = (GetODSDataResponse) ropWebServiceTemplate.marshalSendAndReceive(recommendationUri, request, new WebServiceMessageCallback() {				 
				public void doWithMessage(WebServiceMessage message) {
				
					final String PREFIX = "soapenv";
					final String ODS_PREFIX = "ods";
					SaajSoapMessage saajSoapMessage = (SaajSoapMessage)message;
					
		    		try {    

			    		SOAPMessage soapMessage = saajSoapMessage.getSaajMessage();
			    		SOAPPart soapPart = soapMessage.getSOAPPart();
			    		SOAPEnvelope envelope = soapPart.getEnvelope();
			    		SOAPHeader header = soapMessage.getSOAPHeader();
			    		SOAPBody body = soapMessage.getSOAPBody();
			    		
			    		envelope.removeNamespaceDeclaration(envelope.getPrefix());			    		
			    		envelope.addNamespaceDeclaration(PREFIX, "http://www.w3.org/2003/05/soap-envelope");
			    		envelope.addNamespaceDeclaration(ODS_PREFIX, "http://www.cathaybk.com.tw/ODSwebService/");	
	
			    		envelope.setPrefix(PREFIX);   			
			    		header.setPrefix(PREFIX);    			
			    		body.setPrefix(PREFIX);			
			    		
			    		NodeList nList = body.getElementsByTagName("ods:GetODSData");
			            for (int i = 0; i < nList.getLength(); i++) 
			            {
			                Node nNode = nList.item(i);
			                Element eElement = (Element) nNode;
			                eElement.removeAttribute("xmlns:ns3");
			                eElement.removeAttribute("xmlns");			                
			            }
		    		}
		    		catch(SOAPException e) {
		    			LOGGER.error(URL_SOURCE + e.getMessage(), e);
		    		}
				}
			});
			
			responseData = response.getGetODSDataResult();
		
			
		} catch (Exception e) {
			LOGGER.error(URL_SOURCE + e.getMessage(), e);	
			throw new InternalServerException(recommendationUri, e);
		}
		
		LOGGER.info(LOGGER_END, 
				this.getClass().getSimpleName(),
				Thread.currentThread().getStackTrace()[1].getMethodName());
	
		return responseData;
	}
}
