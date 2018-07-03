package com.cathay.api.bean;

public class ValidateTrustKeyResponse {

	private Header Header;
	private String code;
	private String desc;
	private String trustKey;
	public Header getHeader() {
		return Header;
	}
	public void setHeader(Header header) {
		Header = header;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = desc;
	}
	public String getTrustKey() {
		return trustKey;
	}
	public void setTrustKey(String trustKey) {
		this.trustKey = trustKey;
	}
}
