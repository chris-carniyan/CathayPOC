package com.cathay.api.msg.gift.req;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@XmlType(name = "", propOrder={ "mwHeader",  "tranrq"})
@XmlRootElement(name = "CUBXML")
@XmlAccessorType(XmlAccessType.FIELD)
public class GiftReq {
	
	
		@XmlElement(name = "MWHEADER")
		private MwHeader mwHeader;
		
		@XmlElement(name = "TRANRQ")
		private Tranrq tranrq;

		@XmlAccessorType(XmlAccessType.FIELD)
		@XmlRootElement(name = "MWHEADER")
		@XmlType(name = "", propOrder={ "msgId",  "returnCode", "returnDesc", "txnSeq"})
		public static class MwHeader {
			
			@XmlElement(name = "MSGID")
			private String msgId;
			
			@XmlElement(name = "RETURNCODE")
			private String returnCode;
			
			@XmlElement(name = "RETURNDESC")
			private String returnDesc;
			
			@XmlElement(name = "TXNSEQ")
			private String txnSeq;
			
			@Override
			public String toString() {
				return "MwHeader [msgId=" + msgId + ", returnCode=" + returnCode + ", returnDesc=" + returnDesc
						+ ", txnSeq=" + txnSeq + "]";
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
			public String getTxnSeq() {
				return txnSeq;
			}
			public void setTxnSeq(String txnSeq) {
				this.txnSeq = txnSeq;
			}
		}
		
		
		@XmlAccessorType(XmlAccessType.FIELD)
		@XmlRootElement(name = "TRANRQ")
		@XmlType(name = "", propOrder={ "idNo"})
		public static class Tranrq {
			@XmlElement(name = "IDNO")
			private String idNo;

			public String getIdNo() {
				return idNo;
			}

			public void setIdNo(String idNo) {
				this.idNo = idNo;
			}
		}

	
		public MwHeader getMwHeader() {
			return mwHeader;
		}

		public void setMwHeader(MwHeader mwHeader) {
			this.mwHeader = mwHeader;
		}


		public Tranrq getTranrq() {
			return tranrq;
		}

		public void setTranrq(Tranrq tranrq) {
			this.tranrq = tranrq;
		}
	}

