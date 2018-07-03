//
// 此檔案是由 JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.11 所產生 
// 請參閱 <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// 一旦重新編譯來源綱要, 對此檔案所做的任何修改都將會遺失. 
// 產生時間: 2017.10.17 於 08:54:08 PM CST 
//

package com.cathay.api.rop.req;

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
@XmlType(name = "", propOrder = { "odsQuery" })
@XmlRootElement(name = "CUBXML")

public class GetODSDataReq {
	@XmlElement(name = "ODS_Query", required = true)
	protected GetODSDataReq.ODSQuery odsQuery;

	public GetODSDataReq.ODSQuery getOdsQuery() {
		return odsQuery;
	}
	
	public void setOdsQuery(GetODSDataReq.ODSQuery odsQuery) {
		this.odsQuery = odsQuery;
	}

	@XmlAccessorType(XmlAccessType.FIELD)
	@XmlType(name = "XMLSTRING", propOrder = { "xmlLen", "msgId", "requestApId", "packageSpName", "branchCode", "empCode", "spParameter" })
	public static class ODSQuery {
		@XmlElement(name = "XML_LEN", required = true)
		protected String xmlLen;
		@XmlElement(name = "MSGID", required = true)
		protected String msgId;
		@XmlElement(name = "REQUEST_AP_ID", required = true)
		protected String requestApId;
		@XmlElement(name = "PackageSP_Name", required = true)
		protected String packageSpName;
		@XmlElement(name = "BranchCode", required = true)
		protected String branchCode;
		@XmlElement(name = "EmpCode", required = true)
		protected String empCode;

		@XmlElementWrapper(name = "SP_Parameter")
		@XmlElement(name = "ParameterValue")
		protected List<ParameterValue> spParameter;
		

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

		public String getXmlLen() {
			return xmlLen;
		}

		public void setXmlLen(String xmlLen) {
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
}
