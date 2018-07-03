package com.cathay.api.rop.resp;

import java.util.List;

public class GetODSDataRspData {
	int recordDataLen;
	String msgId;
	String returnCode;
	String returnDesc;
	String nextPage;
	String recordNum;
	List<Record> records;
	
	public class Record{
		String customerId;
		String customerName;
		String birthdayDate;
		String vipFlag;
		String snapshotDate;
		String customerTypeCode;
		String aoId;
		String aoName;
		String aoBranchCode;
		String estFlag;
		String estIntrFlag;
		public String getCustomerId() {
			return customerId;
		}
		public void setCustomerId(String customerId) {
			this.customerId = customerId;
		}
		public String getCustomerName() {
			return customerName;
		}
		public void setCustomerName(String customerName) {
			this.customerName = customerName;
		}
		public String getBirthdayDate() {
			return birthdayDate;
		}
		public void setBirthdayDate(String birthdayDate) {
			this.birthdayDate = birthdayDate;
		}
		public String getVipFlag() {
			return vipFlag;
		}
		public void setVipFlag(String vipFlag) {
			this.vipFlag = vipFlag;
		}
		public String getSnapshotDate() {
			return snapshotDate;
		}
		public void setSnapshotDate(String snapshotDate) {
			this.snapshotDate = snapshotDate;
		}
		public String getCustomerTypeCode() {
			return customerTypeCode;
		}
		public void setCustomerTypeCode(String customerTypeCode) {
			this.customerTypeCode = customerTypeCode;
		}
		public String getAoId() {
			return aoId;
		}
		public void setAoId(String aoId) {
			this.aoId = aoId;
		}
		public String getAoName() {
			return aoName;
		}
		public void setAoName(String aoName) {
			this.aoName = aoName;
		}
		public String getAoBranchCode() {
			return aoBranchCode;
		}
		public void setAoBranchCode(String aoBranchCode) {
			this.aoBranchCode = aoBranchCode;
		}
		public String getEstFlag() {
			return estFlag;
		}
		public void setEstFlag(String estFlag) {
			this.estFlag = estFlag;
		}
		public String getEstIntrFlag() {
			return estIntrFlag;
		}
		public void setEstIntrFlag(String estIntrFlag) {
			this.estIntrFlag = estIntrFlag;
		}
		
	}

	public int getRecordDataLen() {
		return recordDataLen;
	}

	public void setRecordDataLen(int recordDataLen) {
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
