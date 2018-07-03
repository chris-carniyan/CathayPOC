package com.cathay.api.bean;

public class BaseRequest {

	private Header header;
	private String trustKey;
	private String customerId;
	
	public Header getHeader() {
		return header;
	}
	
	public void setHeader(Header header) {
		this.header = header;
	}
	
	public String getTrustKey() {
		return trustKey;
	}
	
	public void setTrustKey(String trustKey) {
		this.trustKey = trustKey;
	}

	public String getCustomerId() {
		return customerId;
	}

	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}
}
