package com.cathay.api.exception;

public class InternalServerException extends Exception {

	private static final long serialVersionUID = -7847049426507097122L;

    public InternalServerException() {
        this("Internal Server Error.");
    }

    public InternalServerException(String message) {
        super(message);
    }

    public InternalServerException(Throwable throwable) {
        super(throwable);
    }

    public InternalServerException(String message, Throwable throwable) {
        super(message, throwable);
    }
}
