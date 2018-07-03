package com.cathay.api.utility;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.JAXBException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.cathay.api.msg.gift.req.GiftReq;
import com.cathay.api.msg.gift.req.GiftRequestParamXml;
import com.cathay.api.msg.gift.resp.GiftRsp;
import com.cathay.api.rop.req.GetODSXmlString;
import com.cathay.api.rop.resp.GetODSDataRsp;
import com.cathay.api.rop.resp.GetODSDataRsp.TRANRS.Record;

public class XmlStringConverter {

	private static final Logger LOGGER = LogManager.getLogger(XmlStringConverter.class);

	private XmlStringConverter() {

	}

	public static String toString(GetODSXmlString reqData) throws JAXBException {

		LOGGER.info("Started converting object to xml");

		StringBuilder sb = new StringBuilder();
		sb.append("<?xml version=\"1.0\"?>")
				.append("<CUBXML xmlns=\"http://www.cathaybk.com.tw/ODSwebService/\" VERSIONNO=\"0.1\">")
				.append("<ODS_Query>").append("<XML_LEN>").append(reqData.getCUBXML().getOdsQuery().getXmlLen())
				.append("</XML_LEN>").append("<MSGID>").append(reqData.getCUBXML().getOdsQuery().getMsgId())
				.append("</MSGID>").append("<REQUEST_AP_ID>").append(reqData.getCUBXML().getOdsQuery().getRequestApId())
				.append("</REQUEST_AP_ID>").append("<PackageSP_Name>")
				.append(reqData.getCUBXML().getOdsQuery().getPackageSpName()).append("</PackageSP_Name>")
				.append("<BranchCode>").append(reqData.getCUBXML().getOdsQuery().getBranchCode())
				.append("</BranchCode>").append("<EmpCode>").append(reqData.getCUBXML().getOdsQuery().getEmpCode())
				.append("</EmpCode>").append("<SP_Parameter>").append("<ParameterValue id='1'>")
				.append(reqData.getCUBXML().getOdsQuery().getSpParameter().get(0).getValue())
				.append("</ParameterValue>").append("<ParameterValue id='2'>")
				.append(reqData.getCUBXML().getOdsQuery().getSpParameter().get(1).getValue())
				.append("</ParameterValue>").append("<ParameterValue id='3'>")
				.append(reqData.getCUBXML().getOdsQuery().getSpParameter().get(2).getValue())
				.append("</ParameterValue>").append("</SP_Parameter>").append("</ODS_Query>").append("</CUBXML>");

		LOGGER.info("Generated xml string : {}", sb.toString());

		return sb.toString();
	}

	public static String toString(GiftRequestParamXml paramXml) throws JAXBException {

		LOGGER.info("Started converting object to xml");

		StringBuilder sb = new StringBuilder();

		sb.append("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>")
				.append("<CUBXML xmlns=\"http://www.cathaybk.com.tw/webservice/mis99\" VERSIONNO=\"0.1\">")
				.append("<MWHEADER>").append("<MSGID>").append(paramXml.getCubxml().getMwHeader().getMsgId())
				.append("</MSGID>").append("<RETURNCODE/>").append("<RETURNDESC/>").append("<TXNSEQ>")
				.append(paramXml.getCubxml().getMwHeader().getTxnSeq()).append("</TXNSEQ>").append("</MWHEADER>")
				.append("<TRANRQ>").append("<IDNO>").append(paramXml.getCubxml().getTranrq().getIdNo())
				.append("</IDNO>").append("</TRANRQ>").append("</CUBXML>");

		LOGGER.info("Generated xml string : {}", sb.toString());

		return sb.toString();
	}

	public static GiftRsp toGiftResponse(String giftRespXmlString) throws JAXBException {

		LOGGER.info("Started converting xml to to object: {}", giftRespXmlString);

		GiftRsp rsp = new GiftRsp();
		GiftRsp.Tranrs tranrs = null;
		GiftReq.MwHeader mwHeader = new GiftReq.MwHeader();

		
		String msgId = giftRespXmlString.contains("<MSGID/>")? null:giftRespXmlString.substring(giftRespXmlString.indexOf("<MSGID>") + 7,
				giftRespXmlString.indexOf("</MSGID>"));
		String returnCode = giftRespXmlString.contains("<RETURNCODE/>")? null:giftRespXmlString.substring(giftRespXmlString.indexOf("<RETURNCODE>") + 12,
				giftRespXmlString.indexOf("</RETURNCODE>"));
		String returnDesc = giftRespXmlString.contains("<RETURNDESC/>")? null:giftRespXmlString.substring(giftRespXmlString.indexOf("<RETURNDESC>") + 12,
				giftRespXmlString.indexOf("</RETURNDESC>"));
		String txnSeq = giftRespXmlString.contains("<TXNSEQ/>")? null:giftRespXmlString.substring(giftRespXmlString.indexOf("<TXNSEQ>") + 8,
				giftRespXmlString.indexOf("</TXNSEQ>"));

		mwHeader.setMsgId(msgId);
		mwHeader.setReturnCode(returnCode);
		mwHeader.setReturnDesc(returnDesc);
		mwHeader.setTxnSeq(txnSeq);
		
		if(giftRespXmlString.contains("TRANRS")) {
			 tranrs = new GiftRsp.Tranrs();
			 
			 String rsCount = giftRespXmlString.contains("<RS_COUNT/>")? null: giftRespXmlString.substring(giftRespXmlString.indexOf("<RS_COUNT>") + 10,
						giftRespXmlString.indexOf("</RS_COUNT>"));
				
				List<GiftRsp.Tranrs.Record> records = new ArrayList<>();
				GiftRsp.Tranrs.Record tmpRec = null;

				int count = Integer.parseInt(rsCount);
				String remainString = "";

				if (count > 0) {
					remainString = giftRespXmlString.substring(giftRespXmlString.indexOf("<RECORD>"));
					new GiftRsp.Tranrs.Record();
				}

				for (int i = 0; i < Integer.parseInt(rsCount); i++) {

					tmpRec = new GiftRsp.Tranrs.Record();

					String idNo = remainString.contains("<IDNO/>")? null: remainString.substring(remainString.indexOf("<IDNO>") + 6, remainString.indexOf("</IDNO"));
					String pid = remainString.contains("<PID/>")? null:remainString.substring(remainString.indexOf("<PID>") + 5, remainString.indexOf("</PID"));
					String fFlag = remainString.contains("<F_FLAG/>")? null:remainString.substring(remainString.indexOf("<F_FLAG>") + 8,
							remainString.indexOf("</F_FLAG"));
					String fCnt = remainString.contains("<F_CNT/>")? null:remainString.substring(remainString.indexOf("<F_CNT>") + 7, remainString.indexOf("</F_CNT"));
					String fEnd = remainString.contains("<F_END/>")? null:remainString.substring(remainString.indexOf("<F_END>") + 7, remainString.indexOf("</F_END"));
					String fCard = remainString.contains("<F_CARD/>")? null:remainString.substring(remainString.indexOf("<F_CARD>") + 8,
							remainString.indexOf("</F_CARD"));
					String fWh = remainString.contains("<F_WH/>")? null:remainString.substring(remainString.indexOf("<F_WH>") + 6, remainString.indexOf("</F_WH"));
					String tFlag = remainString.contains("<T_FLAG/>")? null:remainString.substring(remainString.indexOf("<T_FLAG>") + 8,
							remainString.indexOf("</T_FLAG"));
					String tAmt = remainString.contains("<T_AMT/>")? null:remainString.substring(remainString.indexOf("<T_AMT>") + 7, remainString.indexOf("</T_AMT"));
					String tEnd = remainString.contains("<T_END/>")? null:remainString.substring(remainString.indexOf("<T_END>") + 7, remainString.indexOf("</T_END"));
					String tCard = remainString.contains("<T_CARD/>")? null:remainString.substring(remainString.indexOf("<T_CARD>") + 8,
							remainString.indexOf("</T_CARD"));
					String tWh = remainString.contains("<T_WH/>")? null:remainString.substring(remainString.indexOf("<T_WH>") + 6, remainString.indexOf("</T_WH"));

					tmpRec.setfCard(fCard);
					tmpRec.setfCnt(Integer.parseInt(fCnt));
					tmpRec.setfEnd(fEnd);
					tmpRec.setfFlag(fFlag);
					tmpRec.setfWh(fWh);
					tmpRec.setIdNo(idNo);
					tmpRec.setPid(pid);
					tmpRec.settAmt(Integer.parseInt(tAmt));
					tmpRec.settCard(tCard);
					tmpRec.settEnd(tEnd);
					tmpRec.settFlag(tFlag);
					tmpRec.settWh(tWh);

					records.add(tmpRec);
					remainString = remainString.substring(remainString.indexOf("</RECORD>") + 9);
				}

				tranrs.setRecords(records);
				tranrs.setRsCount(Integer.parseInt(rsCount));
		}

		
		rsp.setMwHeader(mwHeader);
		rsp.setTranrs(tranrs);

		LOGGER.info("Generated object from xml: {}", rsp.toString());

		return rsp;

	}

	public static GetODSDataRsp toODSResponse(String rspXmlString) {

		LOGGER.info("Started converting xml to to object: {}", rspXmlString);

		GetODSDataRsp rsp = new GetODSDataRsp();
		GetODSDataRsp.TRANRS tranrs = null;
		List<GetODSDataRsp.TRANRS.Record> records = new ArrayList<>();

		String recordDataLen = rspXmlString.contains("<RECORDDATALEN/>")? null: rspXmlString.substring(rspXmlString.indexOf("<RECORDDATALEN>") + 15,
				rspXmlString.indexOf("</RECORDDATALEN>"));
		String msgId = rspXmlString.contains("<MSGID/>")? null: rspXmlString.substring(rspXmlString.indexOf("<MSGID>") + 7, rspXmlString.indexOf("</MSGID"));
		String returnCode = rspXmlString.contains("<RETURNCODE/>")? null: rspXmlString.substring(rspXmlString.indexOf("<RETURNCODE>") + 12,
				rspXmlString.indexOf("</RETURNCODE"));
		String returnDesc = rspXmlString.contains("<RETURNDESC/>")? null: rspXmlString.substring(rspXmlString.indexOf("<RETURNDESC>") + 12,
				rspXmlString.indexOf("</RETURNDESC"));
		
		if(rspXmlString.contains("TRANRS")) {
			
			tranrs = new GetODSDataRsp.TRANRS();
			
			String nextPage = rspXmlString.contains("<NextPage/>")? null: rspXmlString.substring(rspXmlString.indexOf("<NextPage>") + 10,
					rspXmlString.indexOf("</NextPage"));
			String recordNum = rspXmlString.contains("<RecordNum/>")? null: rspXmlString.substring(rspXmlString.indexOf("<RecordNum>") + 11,
					rspXmlString.indexOf("</RecordNum"));
	
			rsp.setRecordDataLen(recordDataLen);
			rsp.setMsgId(msgId);
			rsp.setReturnCode(returnCode);
			rsp.setReturnDesc(returnDesc);
			tranrs.setNextPage(nextPage);
			tranrs.setRecordNum(recordNum);
	
			Record tmpRec = null;
	
			String remainString = rspXmlString.substring(rspXmlString.indexOf("<Record>"));
	
			for (int i = 0; i < Integer.parseInt(recordNum); i++) {
	
				tmpRec = new Record();
				String customerId = remainString.contains("<CUSTOMER_ID/>")? null:remainString.substring(remainString.indexOf("<CUSTOMER_ID>") + 13,
						remainString.indexOf("</CUSTOMER_ID"));
				String campaignCode = remainString.contains("<CAMPAIGN_CODE/>")? null:remainString.substring(remainString.indexOf("<CAMPAIGN_CODE>") + 15,
						remainString.indexOf("</CAMPAIGN_CODE"));
				String trackingCode = remainString.contains("<TRACKING_CODE/>")? null:remainString.substring(remainString.indexOf("<TRACKING_CODE>") + 15,
						remainString.indexOf("</TRACKING_CODE"));
				String projectStartDate = remainString.contains("<PROJECT_START_DATE/>")? null:remainString.substring(remainString.indexOf("<PROJECT_START_DATE>") + 20,
						remainString.indexOf("</PROJECT_START_DATE"));
				String projectEndDate = remainString.contains("<PROJECT_END_DATE/>")? null:remainString.substring(remainString.indexOf("<PROJECT_END_DATE>") + 18,
						remainString.indexOf("</PROJECT_END_DATE"));
				String projectName = remainString.contains("<PROJECT_NAME/>")? null:remainString.substring(remainString.indexOf("<PROJECT_NAME>") + 14,
						remainString.indexOf("</PROJECT_NAME"));
				String projectDesc = remainString.contains("<PROJECT_DESC/>")? null:remainString.substring(remainString.indexOf("<PROJECT_DESC>") + 14,
						remainString.indexOf("</PROJECT_DESC"));
				String simpleConversationDesc = remainString.contains("<SIMPLE_CONVERSATION_DESC/>")? null:remainString.substring(
						remainString.indexOf("<SIMPLE_CONVERSATION_DESC>") + 26,
						remainString.indexOf("</SIMPLE_CONVERSATION_DESC"));
				String channelCode = remainString.contains("<CHANNEL_CODE/>")? null:remainString.substring(remainString.indexOf("<CHANNEL_CODE>") + 14,
						remainString.indexOf("</CHANNEL_CODE"));
				String mobilePhoneNbr = remainString.contains("<MOBILE_PHONE_NBR/>")? null:remainString.substring(remainString.indexOf("<MOBILE_PHONE_NBR>") + 18,
						remainString.indexOf("</MOBILE_PHONE_NBR"));
				String buCode = remainString.contains("<BU_CODE/>")? null:remainString.substring(remainString.indexOf("<BU_CODE>") + 9,
						remainString.indexOf("</BU_CODE"));
				String projectUpdateDate = remainString.contains("<PROJECT_UPDATE_DATE/>")? null:remainString.substring(remainString.indexOf("<PROJECT_UPDATE_DATE>") + 21,
						remainString.indexOf("</PROJECT_UPDATE_DATE"));
				String customerName = remainString.contains("<CUSTOMER_NAME/>")? null:remainString.substring(remainString.indexOf("<CUSTOMER_NAME>") + 15,
						remainString.indexOf("</CUSTOMER_NAME"));
				String messageCode = remainString.contains("<MESSAGE_CODE/>")? null:remainString.substring(remainString.indexOf("<MESSAGE_CODE>") + 14,
						remainString.indexOf("</MESSAGE_CODE"));
				String messageDesc = remainString.contains("<MESSAGE_DESC/>")? null:remainString.substring(remainString.indexOf("<MESSAGE_DESC>") + 14,
						remainString.indexOf("</MESSAGE_DESC"));
				String messageSendDate = remainString.contains("<MESSAGE_SEND_DATE/>")? null:remainString.substring(remainString.indexOf("<MESSAGE_SEND_DATE>") + 19,
						remainString.indexOf("</MESSAGE_SEND_DATE"));
				String messageNote = remainString.contains("<MESSAGE_NOTE/>")? null:remainString.substring(remainString.indexOf("<MESSAGE_NOTE>") + 14,
						remainString.indexOf("</MESSAGE_NOTE"));
				String empDepCode = remainString.contains("<EMP_DEP_CODE/>")? null:remainString.substring(remainString.indexOf("<EMP_DEP_CODE>") + 14,
						remainString.indexOf("</EMP_DEP_CODE"));
				String empCode = remainString.contains("<EMP_CODE/>")? null:remainString.substring(remainString.indexOf("<EMP_CODE>") + 10,
						remainString.indexOf("</EMP_CODE"));
				String empName = remainString.contains("<EMP_NAME/>")? null:remainString.substring(remainString.indexOf("<EMP_NAME>") + 10,
						remainString.indexOf("</EMP_NAME"));
				String cusGroupCode = remainString.contains("<CUS_GROUP_CODE/>")? null:remainString.substring(remainString.indexOf("<CUS_GROUP_CODE>") + 16,
						remainString.indexOf("</CUS_GROUP_CODE"));
				String incomeAmt = remainString.contains("<INCOME_AMT/>")? null:remainString.substring(remainString.indexOf("<INCOME_AMT>") + 12,
						remainString.indexOf("</INCOME_AMT"));
				String proposeLimitAmt = remainString.contains("<PROPOSE_LIMIT_AMT/>")? null:remainString.substring(remainString.indexOf("<PROPOSE_LIMIT_AMT>") + 19,
						remainString.indexOf("</PROPOSE_LIMIT_AMT"));
				String note1 = remainString.contains("<NOTE1/>")? null:remainString.substring(remainString.indexOf("<NOTE1>") + 7, remainString.indexOf("</NOTE1"));
				String note2 = remainString.contains("<NOTE2/>")? null:remainString.substring(remainString.indexOf("<NOTE2>") + 7, remainString.indexOf("</NOTE2"));
				String note3 = remainString.contains("<NOTE3/>")? null:remainString.substring(remainString.indexOf("<NOTE3>") + 7, remainString.indexOf("</NOTE3"));
				String note4 = remainString.contains("<NOTE4/>")? null:remainString.substring(remainString.indexOf("<NOTE4>") + 7, remainString.indexOf("</NOTE4"));
				String note5 = remainString.contains("<NOTE5/>")? null:remainString.substring(remainString.indexOf("<NOTE5>") + 7, remainString.indexOf("</NOTE5"));
	
				tmpRec.setCustomerId(customerId);
				tmpRec.setCampaignCode(campaignCode);
				tmpRec.setTrackingCode(trackingCode);
				tmpRec.setBuCode(buCode);
				tmpRec.setChannelCode(channelCode);
				tmpRec.setCusGroupCode(cusGroupCode);
				tmpRec.setCustomerName(customerName);
				tmpRec.setEmpCode(empCode);
				tmpRec.setEmpDepCode(empDepCode);
				tmpRec.setEmpName(empName);
				tmpRec.setIncomeAmt(incomeAmt);
				tmpRec.setMessageCode(messageCode);
				tmpRec.setMessageDesc(messageDesc);
				tmpRec.setMessageNote(messageNote);
				tmpRec.setMessageSendDate(messageSendDate);
				tmpRec.setMobilePhoneNbr(mobilePhoneNbr);
				tmpRec.setNote1(note1);
				tmpRec.setNote2(note2);
				tmpRec.setNote3(note3);
				tmpRec.setNote4(note4);
				tmpRec.setNote5(note5);
				tmpRec.setProjectDesc(projectDesc);
				tmpRec.setProjectEndDate(projectEndDate);
				tmpRec.setProjectName(projectName);
				tmpRec.setProjectStartDate(projectStartDate);
				tmpRec.setProjectUpdateDate(projectUpdateDate);
				tmpRec.setProposeLimitAmt(proposeLimitAmt);
				tmpRec.setSimpleConversationDesc(simpleConversationDesc);
	
				records.add(tmpRec);
				remainString = remainString.substring(remainString.indexOf("</Record>") + 9);
			}			
			tranrs.setRecords(records);
		}
		
		
		rsp.setTranrs(tranrs);

		LOGGER.info("Generated object from xml: {}", rsp.toString());

		return rsp;
	}
}
