package com.cathay.api.service;

import java.util.Collections;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.cathay.api.bean.Header;
import com.cathay.api.bean.TokenValidatorRequest;
import com.cathay.api.bean.ValidateTrustKeyResponse;
import com.cathay.api.exception.TrustKeyValidationException;

@Service
public class TokenValidationService {
	
	private static final String AUTH_SERVICE_UNAVAILABLE = "Authentication Service Unavailable";
	private static final String TRUST_KEY_VALIDATOR = "Validating Trust Key: ";
	private static final String TRUST_KEY_VALIDATOR_RESULT = "Trust Key Validation Result: ";
	private static final String TRUST_KEY_VALIDATOR_ERROR = "Error Validating Trust Key: ";
	
	private static final Logger LOGGER = LogManager.getLogger(TokenValidationService.class);
	
	@Value("${authentication-service}")
	private String authenticationServiceUrl;

	private RestTemplate restTemplate;
	
	@Autowired
	public TokenValidationService(RestTemplate restTemplate){
		this.restTemplate = restTemplate;
	}

	public ValidateTrustKeyResponse validateTrustKey(String trustKey, Header header) throws TrustKeyValidationException {

		ValidateTrustKeyResponse validateTrustKeyResponse = null;
		
		HttpHeaders httpHeaders = null;	
		HttpEntity<TokenValidatorRequest> entity = null;
		
		LOGGER.info(TRUST_KEY_VALIDATOR + trustKey);
		
		TokenValidatorRequest tokenValidatorRequest = new TokenValidatorRequest();
		tokenValidatorRequest.setHeader(header);
		tokenValidatorRequest.setTrustKey(trustKey);
	
		try {
			if(restTemplate == null) {
				restTemplate = new RestTemplate();
			}
			
			httpHeaders = new HttpHeaders();
			httpHeaders.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
			httpHeaders.setContentType(MediaType.APPLICATION_JSON);
			entity = new HttpEntity<>(tokenValidatorRequest, httpHeaders);
			validateTrustKeyResponse = restTemplate.postForObject(authenticationServiceUrl, entity, ValidateTrustKeyResponse.class);
			
			LOGGER.info(TRUST_KEY_VALIDATOR_RESULT + validateTrustKeyResponse.getCode());
		}
		catch(RestClientException e) {		
			LOGGER.error(AUTH_SERVICE_UNAVAILABLE, e);
			throw new TrustKeyValidationException(AUTH_SERVICE_UNAVAILABLE, e);
		}
		catch (IllegalArgumentException e) {
			LOGGER.error(TRUST_KEY_VALIDATOR_ERROR + trustKey, e);
			throw new TrustKeyValidationException(e);
		}
		
		return validateTrustKeyResponse;
	}
}
