
package com.cathay.api.rop.resp;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;


@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "getODSDataResult"
})
@XmlRootElement(name = "GetODSDataResponse")
public class GetODSDataResponse {

    @XmlElement(name = "GetODSDataResult")
    protected String getODSDataResult;

    /**
     * Gets the value of the getODSDataResult property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getGetODSDataResult() {
        return getODSDataResult;
    }

    /**
     * Sets the value of the getODSDataResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setGetODSDataResult(String value) {
        this.getODSDataResult = value;
    }

}
