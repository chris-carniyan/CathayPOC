//package com.cathay.api.controller;
//
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.test.context.junit4.SpringRunner;
//
//public class OdsServiceApiControllerTest {

	
//    private MockMvc mvc;
	
//	public void testGetCtiRecommendation() throws Exception {
//		
//		//Prepare RequestBody
//		RecommendationRequest request = new RecommendationRequest();
//		request.setTrustKey("1");
//		request.setCustomerId("1");
//		request.setHeader(new Header());
//		
//		
//		
//		OdsServiceApiController odsServiceApiController = new OdsServiceApiController(new RestTemplate());
//		odsServiceApiController.getCtiRecommendation(request);
//		
//		
//		Mockito.when(odsServiceApiController.validateTrustKey(Mockito.anyString(), new Header()))
//         .thenReturn(mockResult);
//		
//		ODSWebServiceDataResult mockResult = new ODSWebServiceDataResult();
//
//        Mockito.when(odsServiceApiController.getODSData(null))
//               .thenReturn(mockResult);
//
//        HttpEntity<Response> response  = mvc.perform(get("foos/1")
//           .accept(MediaType.TEXT_PLAIN));
//         
        
	    
		
		//Assert.assertTrue(compareObjects(responseBody, actualData));
//	}
//
//}