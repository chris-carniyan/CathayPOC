package com.cathay.api.exception;

public class TrustKeyValidationException extends Exception {
	
	private static final long serialVersionUID = -7847049426507097122L;

    public TrustKeyValidationException() {
        this("Error while validating trust key.");
    }

    public TrustKeyValidationException(String message) {
        super(message);
    }

    public TrustKeyValidationException(Throwable throwable) {
        super(throwable);
    }

    public TrustKeyValidationException(String message, Throwable throwable) {
        super(message, throwable);
    }
}
