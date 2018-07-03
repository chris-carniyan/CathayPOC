package com.cathay.api.bean;

public class GiftResponseBody {
	
	private String fflag;
	private String customerId;

	public GiftResponseBody(String fflag, String customerId) {
		super();
		this.fflag = fflag;
		this.customerId = customerId;
	}

	public String getFflag() {
		return fflag;
	}

	public void setFflag(String fflag) {
		this.fflag = fflag;
	}

	public String getCustomerId() {
		return customerId;
	}

	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}
	
}
