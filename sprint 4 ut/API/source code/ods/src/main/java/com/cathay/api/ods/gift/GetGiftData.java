
package com.cathay.api.ods.gift;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "paraXml"
})
@XmlRootElement(name = "tem:NEWACTI_SEL_XML")
public class GetGiftData {
	
	@XmlElement(name = "tem:paraXml")
	private String paraXml;

	public String getParaXml() {
		return paraXml;
	}

	public void setParaXml(String paraXml) {
		this.paraXml = paraXml;
	}
}
