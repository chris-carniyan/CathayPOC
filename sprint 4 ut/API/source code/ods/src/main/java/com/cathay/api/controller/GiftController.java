package com.cathay.api.controller;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.cathay.api.bean.BaseResponse;
import com.cathay.api.bean.GiftDetailsResponseBody;
import com.cathay.api.bean.GiftRequest;
import com.cathay.api.bean.GiftResponseBody;
import com.cathay.api.bean.ValidateTrustKeyResponse;
import com.cathay.api.exception.NoRecordFoundException;
import com.cathay.api.msg.gift.resp.GiftRsp;
import com.cathay.api.service.GiftService;
import com.cathay.api.service.TokenValidationService;
import com.cathay.api.utility.StringHelper;
import com.cathay.api.utility.XmlStringConverter;

@PropertySource("classpath:application.properties")
@RestController
public class GiftController {
	
	private static final Logger LOGGER = LogManager.getLogger(GiftController.class);
	private static final String LOGGER_START = "[START @{} ({})]";
	private static final String LOGGER_END = "[END @{} ({})]";
	private static final String GET_REQUEST = "Get Request: ";
	private static final String URL_SOURCE = "Data Source URL: ";
	private static final String SUCCESS_CODE = "0000";
	private static final String INVALID_TRUST_KEY = "Invalid Trust Key";
	private static final String SUCCESS = "Success";
	private static final String ERROR_CODE = "1111";
	private static final String ERROR = "Error";
	private static final String ODS_API = "ODS_API";
	private static final String YES = "Y";
	private static final String NO = "N";

	@Autowired
	private GiftService giftService;
	
	@Autowired
	private TokenValidationService tokenValidationService;	
	
	@CrossOrigin
	@PostMapping(path = "${ods.post.gift}", produces = MediaType.APPLICATION_JSON_VALUE)
	public Object getGift(@RequestBody GiftRequest giftRequest) {
		
		LOGGER.info(LOGGER_START, 
				this.getClass().getSimpleName(),
				Thread.currentThread().getStackTrace()[1].getMethodName());
		
		BaseResponse<GiftResponseBody> baseResponse = null;
		GiftResponseBody giftResponseBody = new GiftResponseBody(NO, giftRequest.getCustomerId());
		ValidateTrustKeyResponse trustKeyResponse = null;
		
		try {
			trustKeyResponse = tokenValidationService.validateTrustKey(giftRequest.getTrustKey(), giftRequest.getHeader());
			
			if(!(StringHelper.isEqual(trustKeyResponse.getCode(), SUCCESS_CODE))) {
				throw new IllegalArgumentException(INVALID_TRUST_KEY);
			}			
			
			String result = giftService.getGiftResponseData(giftRequest);
			GiftRsp rsp = XmlStringConverter.toGiftResponse(result);
			
			if(rsp.getTranrs() == null) {
				throw new NoRecordFoundException();
			}

			if(!rsp.getTranrs().getRecords().isEmpty()) {
				String pid = rsp.getTranrs().getRecords().get(0).getPid();
				String fflag = rsp.getTranrs().getRecords().get(0).getfFlag(); 
				String customerId = rsp.getTranrs().getRecords().get(0).getIdNo(); 

				if(pid != null && fflag != null) {
					giftResponseBody =  new GiftResponseBody(YES, customerId);
				} 
			}

			baseResponse = new BaseResponse<>(SUCCESS_CODE, SUCCESS, giftResponseBody);
			
			LOGGER.info(GET_REQUEST + baseResponse);

		} catch (Exception e) {
			LOGGER.error(URL_SOURCE + e.getMessage(), e);				
			baseResponse = new BaseResponse<>(ERROR_CODE, ERROR, e.getLocalizedMessage(), ODS_API, null);
		}
				
		LOGGER.info(LOGGER_END, 
				this.getClass().getSimpleName(),
				Thread.currentThread().getStackTrace()[1].getMethodName());
		
		
		return baseResponse;
	}
		
	@CrossOrigin
	@PostMapping(path = "${ods.post.gift.details}", produces = MediaType.APPLICATION_JSON_VALUE)
	public Object getGiftDetails(@RequestBody GiftRequest giftRequest) {
		
		LOGGER.info(LOGGER_START, 
				this.getClass().getSimpleName(),
				Thread.currentThread().getStackTrace()[1].getMethodName());
		
		BaseResponse<GiftDetailsResponseBody> baseResponse = null;
		GiftDetailsResponseBody giftDetailsResponseBody = null;
		ValidateTrustKeyResponse trustKeyResponse = null;
		
		try {
			trustKeyResponse = tokenValidationService.validateTrustKey(giftRequest.getTrustKey(), giftRequest.getHeader());
			
			if(!(StringHelper.isEqual(trustKeyResponse.getCode(), SUCCESS_CODE))) {
				throw new IllegalArgumentException(INVALID_TRUST_KEY);
			}		
			
			String result = giftService.getGiftResponseData(giftRequest);
			GiftRsp rsp = XmlStringConverter.toGiftResponse(result);
			
			if(rsp.getTranrs() == null) {
				throw new NoRecordFoundException();
			}
			
			if(!rsp.getTranrs().getRecords().isEmpty()) {
				
				String customerId = rsp.getTranrs().getRecords().get(0).getIdNo();
				String campaignCode = rsp.getTranrs().getRecords().get(0).getPid();
				String campaignEndDate =  rsp.getTranrs().getRecords().get(0).getfEnd();
				String cardNo =  rsp.getTranrs().getRecords().get(0).getfCard();
				int usedCardCnt = rsp.getTranrs().getRecords().get(0).getfCnt();						
				giftDetailsResponseBody = new GiftDetailsResponseBody();
				giftDetailsResponseBody.setCustomerId(customerId);
				giftDetailsResponseBody.setCampaignCode(campaignCode);
				giftDetailsResponseBody.setCampaignEndDate(campaignEndDate);
				giftDetailsResponseBody.setCardNo(cardNo);
				giftDetailsResponseBody.setUsedCardCnt(usedCardCnt);			
			}
			
			baseResponse = new BaseResponse<>(SUCCESS_CODE, SUCCESS, giftDetailsResponseBody);
			
			LOGGER.info(GET_REQUEST + baseResponse);

		} catch (Exception e) {
			LOGGER.error(URL_SOURCE + e.getMessage(), e);				
			baseResponse = new BaseResponse<>(ERROR_CODE, ERROR, e.getLocalizedMessage(), ODS_API, null);
		}
				
		LOGGER.info(LOGGER_END, 
				this.getClass().getSimpleName(),
				Thread.currentThread().getStackTrace()[1].getMethodName());
		
		return baseResponse;
	}
}