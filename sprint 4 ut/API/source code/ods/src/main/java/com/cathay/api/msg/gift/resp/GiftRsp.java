package com.cathay.api.msg.gift.resp;

import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import com.cathay.api.msg.gift.req.GiftReq.MwHeader;

@XmlType(name = "", propOrder={ "mwHeader",  "tranrs"})
@XmlRootElement(name = "CUBXML")
@XmlAccessorType(XmlAccessType.FIELD)
	
public class  GiftRsp {
	@XmlElement(name = "MWHEADER")
	private MwHeader mwHeader;
	
	@XmlElement(name = "TRANRS")
	private Tranrs tranrs;

	
	@XmlAccessorType(XmlAccessType.FIELD)
	@XmlRootElement(name = "TRANRS")
	public static class Tranrs {
		@XmlElement(name = "RSCOUNT")
		private int rsCount;
		
		@XmlElementWrapper(name = "RECORDS")
		@XmlElement(name = "RECORD")
		private List<Record> records;
		
		
		public int getRsCount() {
			return rsCount;
		}


		public void setRsCount(int rsCount) {
			this.rsCount = rsCount;
		}


		public List<Record> getRecords() {
			return records;
		}


		public void setRecords(List<Record> records) {
			this.records = records;
		}
		
		@Override
		public String toString() {
			return "Tranrs [rsCount=" + rsCount + ", records=" + records + "]";
		}

		@XmlAccessorType(XmlAccessType.FIELD)
		@XmlRootElement(name = "RECORD")
		public static class Record{
			@XmlElement(name = "IDNO")
			private String idNo;
			
			@Override
			public String toString() {
				return "Record [idNo=" + idNo + ", pid=" + pid + ", fFlag=" + fFlag + ", fCnt=" + fCnt + ", fEnd="
						+ fEnd + ", fCard=" + fCard + ", fWh=" + fWh + ", tFlag=" + tFlag + ", tAmt=" + tAmt + ", tEnd="
						+ tEnd + ", tCard=" + tCard + ", tWh=" + tWh + "]";
			}
			@XmlElement(name = "PID")
			private String pid;
			
			@XmlElement(name = "F_FLAG")
			private String fFlag;
			
			@XmlElement(name = "F_CNT")
			private int fCnt;
			
			@XmlElement(name = "F_END")
			private String fEnd;
			
			@XmlElement(name = "F_CARD")
			private String fCard;
			
			@XmlElement(name = "F_WH")
			private String fWh;
			
			@XmlElement(name = "T_FLAG")
			private String tFlag;
			
			@XmlElement(name = "T_AMT")
			private double tAmt;
			
			@XmlElement(name = "T_END")
			private String tEnd;
			
			@XmlElement(name = "T_CARD")
			private String tCard;
			
			@XmlElement(name = "T_WH")
			private String tWh;
			
			public String getIdNo() {
				return idNo;
			}
			public void setIdNo(String idNo) {
				this.idNo = idNo;
			}
			public String getPid() {
				return pid;
			}
			public void setPid(String pid) {
				this.pid = pid;
			}
			public String getfFlag() {
				return fFlag;
			}
			public void setfFlag(String fFlag) {
				this.fFlag = fFlag;
			}

			public String getfEnd() {
				return fEnd;
			}
			public void setfEnd(String fEnd) {
				this.fEnd = fEnd;
			}
			public String getfCard() {
				return fCard;
			}
			public void setfCard(String fCard) {
				this.fCard = fCard;
			}
			public String getfWh() {
				return fWh;
			}
			public void setfWh(String fWh) {
				this.fWh = fWh;
			}
			public String gettFlag() {
				return tFlag;
			}
			public void settFlag(String tFlag) {
				this.tFlag = tFlag;
			}
			public String gettEnd() {
				return tEnd;
			}
			public void settEnd(String tEnd) {
				this.tEnd = tEnd;
			}
			public String gettCard() {
				return tCard;
			}
			public void settCard(String tCard) {
				this.tCard = tCard;
			}
			public String gettWh() {
				return tWh;
			}
			public void settWh(String tWh) {
				this.tWh = tWh;
			}
			public int getfCnt() {
				return fCnt;
			}
			public void setfCnt(int fCnt) {
				this.fCnt = fCnt;
			}
			public double gettAmt() {
				return tAmt;
			}
			public void settAmt(double tAmt) {
				this.tAmt = tAmt;
			}	
		}
	}

	public MwHeader getMwHeader() {
		return mwHeader;
	}

	public void setMwHeader(MwHeader mwHeader) {
		this.mwHeader = mwHeader;
	}

	public Tranrs getTranrs() {
		return tranrs;
	}

	@Override
	public String toString() {
		return "GiftRsp [mwHeader=" + mwHeader + ", tranrs=" + tranrs + "]";
	}

	public void setTranrs(Tranrs tranrs) {
		this.tranrs = tranrs;
	}
	
}
