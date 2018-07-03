package com.cathay.api.bean;

public class TokenValidatorRequest {
	
	private Header header;
	private String trustKey;
	
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
}
