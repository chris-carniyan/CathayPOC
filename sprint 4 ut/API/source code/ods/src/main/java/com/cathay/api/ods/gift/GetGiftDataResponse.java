//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.11 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2018.05.17 at 04:27:27 PM SGT 
//


package com.cathay.api.ods.gift;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "getGiftDataResult"
})

@XmlRootElement(name = "NEWACTI_SEL_XMLResponse", namespace="http://tempuri.org/")
public class GetGiftDataResponse {

    @XmlElement(name = "NEWACTI_SEL_XMLResult", namespace="http://tempuri.org/")
    private GetGiftDataResult getGiftDataResult;
    
    public GetGiftDataResult getGetGiftDataResponse() {
		return getGiftDataResult;
	}


	public void setGetGiftDataResponse(GetGiftDataResult getGiftDataResult) {
		this.getGiftDataResult = getGiftDataResult;
	}
	
	@XmlAccessorType(XmlAccessType.FIELD)
	@XmlRootElement(name = "NEWACTI_SEL_XMLResult")
	public static class GetGiftDataResult{
    	
    	@XmlElement(name = "string")
    	private String string;

		public String getString() {
			return string;
		}

		public void setString(String string) {
			this.string = string;
		}
    	
    }
}