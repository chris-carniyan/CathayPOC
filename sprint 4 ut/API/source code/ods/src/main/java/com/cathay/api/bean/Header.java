package com.cathay.api.bean;

public class Header {

	private String apId;
	private String branchId;
	private String employeeId;
	private String clientIp;
	private String txnDateTime;
	
	public String getApId() {
		return apId;
	}
	public void setApId(String apId) {
		this.apId = apId;
	}
	public String getBranchId() {
		return branchId;
	}
	public void setBranchId(String branchId) {
		this.branchId = branchId;
	}
	public String getEmployeeId() {
		return employeeId;
	}
	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}
	public String getClientIp() {
		return clientIp;
	}
	public void setClientIp(String clientIp) {
		this.clientIp = clientIp;
	}
	public String getTxnDateTime() {
		return txnDateTime;
	}
	public void setTxnDateTime(String txnDateTime) {
		this.txnDateTime = txnDateTime;
	}
}
