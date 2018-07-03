package com.cathay.api.exception;

public class NoRecordFoundException extends Exception {
	
	private static final long serialVersionUID = -7847049426507097122L;

    public NoRecordFoundException() {
        this("No Record Found.");
    }

    public NoRecordFoundException(String message) {
        super(message);
    }

    public NoRecordFoundException(Throwable throwable) {
        super(throwable);
    }

    public NoRecordFoundException(String message, Throwable throwable) {
        super(message, throwable);
    }
}
