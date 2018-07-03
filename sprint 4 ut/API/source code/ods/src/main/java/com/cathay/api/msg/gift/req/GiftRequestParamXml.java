package com.cathay.api.msg.gift.req;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@XmlType(name = "", propOrder={ "CUBXML"})
@XmlRootElement(name = "tem:paraXml")
@XmlAccessorType(XmlAccessType.FIELD)
public class GiftRequestParamXml {
	
	@XmlElement(name = "CUBXML")
	private GiftReq cubxml;

	public GiftReq getCubxml() {
		return cubxml;
	}

	public void setCubxml(GiftReq cubxml) {
		this.cubxml = cubxml;
	}
}
