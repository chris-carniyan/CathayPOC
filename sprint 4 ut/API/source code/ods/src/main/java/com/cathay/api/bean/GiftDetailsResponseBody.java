package com.cathay.api.bean;

public class GiftDetailsResponseBody {
	private String customerId;
	private String campaignCode;
	private String campaignEndDate;
	private String cardNo;
	private int usedCardCnt;
	
	public String getCustomerId() {
		return customerId;
	}
	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}
	public String getCampaignCode() {
		return campaignCode;
	}
	public void setCampaignCode(String campaignCode) {
		this.campaignCode = campaignCode;
	}
	public String getCampaignEndDate() {
		return campaignEndDate;
	}
	public void setCampaignEndDate(String campaignEndDate) {
		this.campaignEndDate = campaignEndDate;
	}
	public String getCardNo() {
		return cardNo;
	}
	public void setCardNo(String cardNo) {
		this.cardNo = cardNo;
	}
	public int getUsedCardCnt() {
		return usedCardCnt;
	}
	public void setUsedCardCnt(int usedCardCnt) {
		this.usedCardCnt = usedCardCnt;
	}
}
