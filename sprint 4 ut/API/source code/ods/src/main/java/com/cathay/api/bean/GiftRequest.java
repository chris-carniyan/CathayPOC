package com.cathay.api.bean;

public class GiftRequest extends BaseRequest{
	private String transactionSequence;

	public String getTransactionSequence() {
		return transactionSequence;
	}

	public void setTransactionSequence(String transactionSequence) {
		this.transactionSequence = transactionSequence;
	}
}
