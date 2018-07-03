package com.cathay.api.rop.resp;

import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.XmlValue;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "XMLSTRING", propOrder = { "xmlLen", "msgId", "requestApId", "packageSpName", "branchCode", "empCode", "spParameter" })
@XmlRootElement(name = "XMLSTRING")
public class GetODSDataReqData {

	@XmlElement(name = "XML_LEN", required = true)
	private int xmlLen;
	
	@XmlElement(name = "MSGID", required = true)
	private String msgId;
	
	@XmlElement(name = "REQUEST_AP_ID", required = true)
	private String requestApId;
	
	@XmlElement(name = "PackageSP_Name", required = true)
	private String packageSpName;
	
	@XmlElement(name = "BranchCode", required = true)
	private String branchCode;
	
	@XmlElement(name = "EmpCode", required = true)
	private String empCode;
	
	
	@XmlElementWrapper(name = "SP_Parameter")
	@XmlElement(name = "ParameterValue")
	private List<ParameterValue> spParameter;
	

	@XmlAccessorType(XmlAccessType.FIELD)
	public static class ParameterValue {
		
		public ParameterValue(){}
		public ParameterValue(int id, String value){
			this.id = id;
			this.value = value;
		}
		@XmlValue
		private String value;
		@XmlAttribute(name = "id")
		private int id;
		public String getValue() {
			return value;
		}
		public void setValue(String value) {
			this.value = value;
		}
		public int getId() {
			return id;
		}
		public void setId(int id) {
			this.id = id;
		}		
	}
	
	public int getXmlLen() {
		return xmlLen;
	}
	
	public void setXmlLen(int xmlLen) {
		this.xmlLen = xmlLen;
	}
	
	public String getMsgId() {
		return msgId;
	}
	
	public void setMsgId(String msgId) {
		this.msgId = msgId;
	}
	public String getRequestApId() {
		return requestApId;
	}
	
	public void setRequestApId(String requestApId) {
		this.requestApId = requestApId;
	}
	
	public String getPackageSpName() {
		return packageSpName;
	}
	
	public void setPackageSpName(String packageSpName) {
		this.packageSpName = packageSpName;
	}
	
	public String getBranchCode() {
		return branchCode;
	}
	
	public void setBranchCode(String branchCode) {
		this.branchCode = branchCode;
	}
	
	public String getEmpCode() {
		return empCode;
	}
	
	public void setEmpCode(String empCode) {
		this.empCode = empCode;
	}

	public List<ParameterValue> getSpParameter() {
		return spParameter;
	}

	public void setSpParameter(List<ParameterValue> spParameter) {
		this.spParameter = spParameter;
	}
}
