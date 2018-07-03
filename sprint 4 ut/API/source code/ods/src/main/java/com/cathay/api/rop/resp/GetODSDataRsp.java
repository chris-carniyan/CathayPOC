
package com.cathay.api.rop.resp;

import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

		
@XmlRootElement(name = "CUBXML", namespace = "http://www.cathaybk.com.tw/ODSwebService/")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = { "recordDataLen","msgId","returnCode","returnDesc","tranrs" })
public class GetODSDataRsp {
	
	@XmlElement(name = "RECORDDATALEN", required = true)
	protected String recordDataLen;
	@XmlElement(name = "MSGID", required = true)
	protected String msgId;
	@XmlElement(name = "RETURNCODE", required = true)
	protected String returnCode;
	@XmlElement(name = "RETURNDESC", required = true)
	protected String returnDesc;
	
	@Override
	public String toString() {
		return "GetODSDataRsp [recordDataLen=" + recordDataLen + ", msgId=" + msgId + ", returnCode=" + returnCode
				+ ", returnDesc=" + returnDesc + ", tranrs=" + tranrs + "]";
	}


	@XmlElement(name = "TRANRS", required = true)
	protected GetODSDataRsp.TRANRS tranrs;

	public String getRecordDataLen() {
		return recordDataLen;
	}
	public void setRecordDataLen(String recordDataLen) {
		this.recordDataLen = recordDataLen;
	}
	public String getMsgId() {
		return msgId;
	}
	public void setMsgId(String msgId) {
		this.msgId = msgId;
	}
	public String getReturnCode() {
		return returnCode;
	}
	public void setReturnCode(String returnCode) {
		this.returnCode = returnCode;
	}
	public String getReturnDesc() {
		return returnDesc;
	}
	public void setReturnDesc(String returnDesc) {
		this.returnDesc = returnDesc;
	}
	public GetODSDataRsp.TRANRS getTranrs() {
		return tranrs;
	}
	public void setTranrs(GetODSDataRsp.TRANRS tranrs) {
		this.tranrs = tranrs;
	}


	@XmlAccessorType(XmlAccessType.FIELD)
	@XmlType(name = "", propOrder = { "nextPage", "recordNum", "records"})
	public static class TRANRS {
		@Override
		public String toString() {
			return "TRANRS [nextPage=" + nextPage + ", recordNum=" + recordNum + ", records=" + records + "]";
		}

		@XmlElement(name = "NextPage", required = true)
		protected String nextPage;
		@XmlElement(name = "RecordNum", required = true)
		protected String recordNum;
		
		@XmlElementWrapper(name = "Records")
		@XmlElement(name = "Record")
		protected List<Record> records;
		
		@XmlRootElement(name = "Record")
		@XmlAccessorType(XmlAccessType.FIELD)
		public static class Record {
			
			@Override
			public String toString() {
				return "Record [customerId=" + customerId + ", campaignCode=" + campaignCode + ", trackingCode="
						+ trackingCode + ", projectStartDate=" + projectStartDate + ", projectEndDate=" + projectEndDate
						+ ", projectName=" + projectName + ", projectDesc=" + projectDesc + ", simpleConversationDesc="
						+ simpleConversationDesc + ", channelCode=" + channelCode + ", mobilePhoneNbr=" + mobilePhoneNbr
						+ ", buCode=" + buCode + ", projectUpdateDate=" + projectUpdateDate + ", customerName="
						+ customerName + ", messageCode=" + messageCode + ", messageDesc=" + messageDesc
						+ ", messageSendDate=" + messageSendDate + ", messageNote=" + messageNote + ", empDepCode="
						+ empDepCode + ", empCode=" + empCode + ", empName=" + empName + ", cusGroupCode="
						+ cusGroupCode + ", incomeAmt=" + incomeAmt + ", proposeLimitAmt=" + proposeLimitAmt
						+ ", note1=" + note1 + ", note2=" + note2 + ", note3=" + note3 + ", note4=" + note4 + ", note5="
						+ note5 + "]";
			}

			@XmlElement(name="CUSTOMER_ID")
			private String customerId;
			
			@XmlElement(name="CAMPAIGN_CODE")
			private String campaignCode;
			
			@XmlElement(name="TRACKING_CODE")
			private String trackingCode;
			
			@XmlElement(name="PROJECT_START_DATE")
			private String projectStartDate;
			
			@XmlElement(name="PROJECT_END_DATE")
			private String projectEndDate;
			
			@XmlElement(name="PROJECT_NAME")
			private String projectName;
			
			@XmlElement(name="PROJECT_DESC")
			private String projectDesc;
			
			@XmlElement(name="SIMPLE_CONVERSATION_DESC")
			private String simpleConversationDesc;
			
			@XmlElement(name="CHANNEL_CODE")
			private String channelCode;
			
			@XmlElement(name="MOBILE_PHONE_NBR")
			private String mobilePhoneNbr;
			
			@XmlElement(name="BU_CODE")
			private String buCode;
			
			@XmlElement(name="PROJECT_UPDATE_DATE")
			private String projectUpdateDate;
			
			@XmlElement(name="CUSTOMER_NAME")
			private String customerName;
			
			@XmlElement(name="MESSAGE_CODE")
			private String messageCode;
			
			@XmlElement(name="MESSAGE_DESC")
			private String messageDesc;
			
			@XmlElement(name="MESSAGE_SEND_DATE")
			private String messageSendDate;
			
			@XmlElement(name="MESSAGE_NOTE")
			private String messageNote;
			
			@XmlElement(name="EMP_DEP_CODE")
			private String empDepCode;
			
			@XmlElement(name="EMP_CODE")
			private String empCode;
			
			@XmlElement(name="EMP_NAME")
			private String empName;
			
			@XmlElement(name="CUS_GROUP_CODE")
			private String cusGroupCode;
			
			@XmlElement(name="INCOME_AMT")
			private String incomeAmt;
			
			@XmlElement(name="PROPOSE_LIMIT_AMT")
			private String proposeLimitAmt;
			
			@XmlElement(name="NOTE1")
			private String note1;
			
			@XmlElement(name="NOTE2")
			private String note2;
			
			@XmlElement(name="NOTE3")
			private String note3;
			
			@XmlElement(name="NOTE4")
			private String note4;
			
			@XmlElement(name="NOTE5")
			private String note5;

			public String getCustomerId() {
				return customerId;
			}

			public void setCustomerId(String customerId) {
				this.customerId = customerId;
			}

			public String getCampaignCode() {
				return campaignCode;
			}

			public void setCampaignCode(String campaignCode) {
				this.campaignCode = campaignCode;
			}

			public String getTrackingCode() {
				return trackingCode;
			}

			public void setTrackingCode(String trackingCode) {
				this.trackingCode = trackingCode;
			}

			public String getProjectStartDate() {
				return projectStartDate;
			}

			public void setProjectStartDate(String projectStartDate) {
				this.projectStartDate = projectStartDate;
			}

			public String getProjectEndDate() {
				return projectEndDate;
			}

			public void setProjectEndDate(String projectEndDate) {
				this.projectEndDate = projectEndDate;
			}

			public String getProjectName() {
				return projectName;
			}

			public void setProjectName(String projectName) {
				this.projectName = projectName;
			}

			public String getProjectDesc() {
				return projectDesc;
			}

			public void setProjectDesc(String projectDesc) {
				this.projectDesc = projectDesc;
			}

			public String getSimpleConversationDesc() {
				return simpleConversationDesc;
			}

			public void setSimpleConversationDesc(String simpleConversationDesc) {
				this.simpleConversationDesc = simpleConversationDesc;
			}

			public String getChannelCode() {
				return channelCode;
			}

			public void setChannelCode(String channelCode) {
				this.channelCode = channelCode;
			}

			public String getMobilePhoneNbr() {
				return mobilePhoneNbr;
			}

			public void setMobilePhoneNbr(String mobilePhoneNbr) {
				this.mobilePhoneNbr = mobilePhoneNbr;
			}

			public String getBuCode() {
				return buCode;
			}

			public void setBuCode(String buCode) {
				this.buCode = buCode;
			}

			public String getProjectUpdateDate() {
				return projectUpdateDate;
			}

			public void setProjectUpdateDate(String projectUpdateDate) {
				this.projectUpdateDate = projectUpdateDate;
			}

			public String getCustomerName() {
				return customerName;
			}

			public void setCustomerName(String customerName) {
				this.customerName = customerName;
			}

			public String getMessageCode() {
				return messageCode;
			}

			public void setMessageCode(String messageCode) {
				this.messageCode = messageCode;
			}

			public String getMessageDesc() {
				return messageDesc;
			}

			public void setMessageDesc(String messageDesc) {
				this.messageDesc = messageDesc;
			}

			public String getMessageSendDate() {
				return messageSendDate;
			}

			public void setMessageSendDate(String messageSendDate) {
				this.messageSendDate = messageSendDate;
			}

			public String getMessageNote() {
				return messageNote;
			}

			public void setMessageNote(String messageNote) {
				this.messageNote = messageNote;
			}

			public String getEmpDepCode() {
				return empDepCode;
			}

			public void setEmpDepCode(String empDepCode) {
				this.empDepCode = empDepCode;
			}

			public String getEmpCode() {
				return empCode;
			}

			public void setEmpCode(String empCode) {
				this.empCode = empCode;
			}

			public String getEmpName() {
				return empName;
			}

			public void setEmpName(String empName) {
				this.empName = empName;
			}

			public String getCusGroupCode() {
				return cusGroupCode;
			}

			public void setCusGroupCode(String cusGroupCode) {
				this.cusGroupCode = cusGroupCode;
			}

			public String getIncomeAmt() {
				return incomeAmt;
			}

			public void setIncomeAmt(String incomeAmt) {
				this.incomeAmt = incomeAmt;
			}

			public String getProposeLimitAmt() {
				return proposeLimitAmt;
			}

			public void setProposeLimitAmt(String proposeLimitAmt) {
				this.proposeLimitAmt = proposeLimitAmt;
			}

			public String getNote1() {
				return note1;
			}

			public void setNote1(String note1) {
				this.note1 = note1;
			}

			public String getNote2() {
				return note2;
			}

			public void setNote2(String note2) {
				this.note2 = note2;
			}

			public String getNote3() {
				return note3;
			}

			public void setNote3(String note3) {
				this.note3 = note3;
			}

			public String getNote4() {
				return note4;
			}

			public void setNote4(String note4) {
				this.note4 = note4;
			}

			public String getNote5() {
				return note5;
			}

			public void setNote5(String note5) {
				this.note5 = note5;
			}
			
		}

		public String getNextPage() {
			return nextPage;
		}

		public void setNextPage(String nextPage) {
			this.nextPage = nextPage;
		}

		public String getRecordNum() {
			return recordNum;
		}

		public void setRecordNum(String recordNum) {
			this.recordNum = recordNum;
		}

		public List<Record> getRecords() {
			return records;
		}

		public void setRecords(List<Record> records) {
			this.records = records;
		}
	}
}
