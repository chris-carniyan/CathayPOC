package com.cathay.api.bean;


public class RecommendationResponseBody {
	
	private String personalLoan;
	private String mortgage;
	private String paymentInstallment;
	private String installmentLoansCashAdv;
	private String memo;
	
	public RecommendationResponseBody(String personalLoan, String mortgage, String paymentInstallment, String installmentLoansCashAdv, String memo) {
		super();
		this.personalLoan = personalLoan;
		this.mortgage = mortgage;
		this.paymentInstallment = paymentInstallment;
		this.installmentLoansCashAdv = installmentLoansCashAdv;
		this.memo = memo;
	}
	
	public RecommendationResponseBody() {
		
	}
	
	public String getPersonalLoan() {
		return personalLoan;
	}
	public void setPersonalLoan(String personalLoan) {
		this.personalLoan = personalLoan;
	}
	public String getMortgage() {
		return mortgage;
	}
	public void setMortgage(String mortgage) {
		this.mortgage = mortgage;
	}
	public String getPaymentInstallment() {
		return paymentInstallment;
	}
	public void setPaymentInstallment(String paymentInstallment) {
		this.paymentInstallment = paymentInstallment;
	}
	public String getInstallmentLoansCashAdv() {
		return installmentLoansCashAdv;
	}
	public void setInstallmentLoansCashAdv(String installmentLoansCashAdv) {
		this.installmentLoansCashAdv = installmentLoansCashAdv;
	}
		
	
	
	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	@Override
	public String toString() {
		return "ODSResponseBody [personalLoan=" + personalLoan + ", mortgage=" + mortgage + ", paymentInstallment="
				+ paymentInstallment + ", installmentLoansCashAdv=" + installmentLoansCashAdv + ", memo=" + memo + "]";
	}

}
