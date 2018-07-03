package com.cathay.api.controller;
import java.util.List;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.cathay.api.bean.BaseRequest;
import com.cathay.api.bean.BaseResponse;
import com.cathay.api.bean.RecommendationResponseBody;
import com.cathay.api.bean.ValidateTrustKeyResponse;
import com.cathay.api.exception.NoRecordFoundException;
import com.cathay.api.rop.resp.GetODSDataRsp;
import com.cathay.api.rop.resp.GetODSDataRsp.TRANRS.Record;
import com.cathay.api.service.RecommendationService;
import com.cathay.api.service.TokenValidationService;
import com.cathay.api.utility.StringHelper;
import com.cathay.api.utility.XmlStringConverter;

@PropertySource("classpath:application.properties")
@RestController
public class RecommendationController {
	
	private static final Logger LOGGER = LogManager.getLogger(RecommendationController.class);
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
	private static final String CTI = "CTI";
	private static final String YES = "Y";
	private static final String NO = "N";

	@Autowired
	private RecommendationService recommendationService;

	@Autowired
	private TokenValidationService tokenValidationService;
	
	@CrossOrigin
	@PostMapping(path = "${ods.post.recommendation}", produces = MediaType.APPLICATION_JSON_VALUE)
	public Object getCtiRecommendation(@RequestBody BaseRequest recommendationRequest) {
		
		LOGGER.info(LOGGER_START, 
				this.getClass().getSimpleName(),
				Thread.currentThread().getStackTrace()[1].getMethodName());
		
		RecommendationResponseBody oDSResponseBody = new RecommendationResponseBody(NO, NO, NO, NO, null);
		BaseResponse<RecommendationResponseBody> baseResponse = null;
		ValidateTrustKeyResponse trustKeyResponse = null;
		
		try {
			trustKeyResponse = tokenValidationService.validateTrustKey(recommendationRequest.getTrustKey(), recommendationRequest.getHeader());
			
			if(!(StringHelper.isEqual(trustKeyResponse.getCode(), SUCCESS_CODE))) {
				throw new IllegalArgumentException(INVALID_TRUST_KEY);
			}
			
			String rspXmlString = recommendationService.getRecommendationData(recommendationRequest);
			
			if(rspXmlString == null) {
				throw new NoRecordFoundException();
			}
			
			GetODSDataRsp resp = XmlStringConverter.toODSResponse(rspXmlString);
				
			if(resp.getTranrs() == null) {
				throw new NoRecordFoundException();
			}
			
			List<Record> records = resp.getTranrs().getRecords();			
			for(Record rec: records) { 
				if(StringHelper.isEqual(rec.getChannelCode(), CTI)) {
					if(rec.getProjectName().contains("直效_金服轉介小信")) {
						oDSResponseBody.setPersonalLoan(YES);
					}
					else if(rec.getProjectName().contains("直效_金服轉介房貸")) {
						oDSResponseBody.setMortgage(YES);
					}
					else if(rec.getProjectName().contains("卡企") && rec.getProjectName().contains("帳單分期")) {
						oDSResponseBody.setPaymentInstallment(YES);			
						oDSResponseBody.setMemo(rec.getMessageCode());
					}
					else if(rec.getProjectName().contains("信用卡高收益產品權益服務")) {
						oDSResponseBody.setInstallmentLoansCashAdv(YES);
					}		
				}					
			}
						
			baseResponse = new BaseResponse<>(SUCCESS_CODE, SUCCESS, oDSResponseBody);
			
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