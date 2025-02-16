package com.marian.application.model;
import java.time.LocalDate;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
@Entity
public class CollectionRequestInfo {
	 private String district;
	 private String houseName;
	 private String landmark;
	 private String cityName;
	 private Long contactNum;
	 private String reqStatus="Requested";
	 private String statusDes="Awaiting action: User request pending approval or rejection.";
	 private String category;
	 private int reqUserId;
	 private LocalDate sugDate1;
	 private LocalDate sugDate2;
	 @Id
		@GeneratedValue(strategy=GenerationType.IDENTITY)
		
		private int requestId;
	CollectionRequestInfo() {
		super();
		// TODO Auto-generated constructor stub
	}
	CollectionRequestInfo(String district, String houseName, String landmark, String cityName, Long contactNum,
			String reqStatus, String statusDes, String category, int reqUserId, LocalDate sugDate1, LocalDate sugDate2,
			int requestId) {
		super();
		this.district = district;
		this.houseName = houseName;
		this.landmark = landmark;
		this.cityName = cityName;
		this.contactNum = contactNum;
		this.reqStatus = reqStatus;
		this.statusDes = statusDes;
		this.category = category;
		this.reqUserId = reqUserId;
		this.sugDate1 = sugDate1;
		this.sugDate2 = sugDate2;
		this.requestId = requestId;
	}
	@Override
	public String toString() {
		return "CollectionRequestInfo [district=" + district + ", houseName=" + houseName + ", landmark=" + landmark
				+ ", cityName=" + cityName + ", contactNum=" + contactNum + ", reqStatus=" + reqStatus + ", statusDes="
				+ statusDes + ", category=" + category + ", reqUserId=" + reqUserId + ", sugDate1=" + sugDate1
				+ ", sugDate2=" + sugDate2 + ", requestId=" + requestId + "]";
	}
	public String getDistrict() {
		return district;
	}
	public void setDistrict(String district) {
		this.district = district;
	}
	public String getHouseName() {
		return houseName;
	}
	public void setHouseName(String houseName) {
		this.houseName = houseName;
	}
	public String getLandmark() {
		return landmark;
	}
	public void setLandmark(String landmark) {
		this.landmark = landmark;
	}
	public String getCityName() {
		return cityName;
	}
	public void setCityName(String cityName) {
		this.cityName = cityName;
	}
	public Long getContactNum() {
		return contactNum;
	}
	public void setContactNum(Long contactNum) {
		this.contactNum = contactNum;
	}
	public String getReqStatus() {
		return reqStatus;
	}
	public void setReqStatus(String reqStatus) {
		this.reqStatus = reqStatus;
	}
	public String getStatusDes() {
		return statusDes;
	}
	public void setStatusDes(String statusDes) {
		this.statusDes = statusDes;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public int getReqUserId() {
		return reqUserId;
	}
	public void setReqUserId(int reqUserId) {
		this.reqUserId = reqUserId;
	}
	public LocalDate getSugDate1() {
		return sugDate1;
	}
	public void setSugDate1(LocalDate sugDate1) {
		this.sugDate1 = sugDate1;
	}
	public LocalDate getSugDate2() {
		return sugDate2;
	}
	public void setSugDate2(LocalDate sugDate2) {
		this.sugDate2 = sugDate2;
	}
	public int getRequestId() {
		return requestId;
	}
	public void setRequestId(int requestId) {
		this.requestId = requestId;
	}
		
		
		
}
