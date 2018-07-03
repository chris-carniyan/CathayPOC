package com.cathay.api.rop.req;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;


@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = { "cubxml" })
@XmlRootElement(name = "xmlstring")
public class GetODSXmlString {
	
	@XmlElement(name = "CUBXML", required = true)
	private GetODSDataReq cubxml;

	public GetODSDataReq getCUBXML() {
		return cubxml;
	}

	public void setCUBXML(GetODSDataReq cubxml) {
		this.cubxml = cubxml;
	}
}
