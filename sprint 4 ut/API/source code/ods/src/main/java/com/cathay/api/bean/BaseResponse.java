package com.cathay.api.bean;

public class BaseResponse<T> {

	private String code;
	private String message;
	private String description;
	private String source;
	private T result;
	
	public BaseResponse() {
	}
	
	public BaseResponse(String code, String message, T oDSResponseBody) {
		super();
		this.code = code;
		this.message = message;
		this.result = oDSResponseBody;
	}

	public BaseResponse(String code, String message, String description, String source, T oDSResponseBody) {
		super();
		this.code = code;
		this.message = message;
		this.description = description;
		this.source = source;
		this.result = oDSResponseBody;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public T getResult() {
		return result;
	}

	public void T(T result) {
		this.result = result;
	}

	@Override
	public String toString() {
		return "ResponseObject [code=" + code + ", message=" + message + ", description=" + description
				+ ", source=" + source + ", result=" + result + "]";
	}
}
