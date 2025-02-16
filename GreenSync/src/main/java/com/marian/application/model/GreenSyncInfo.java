package com.marian.application.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class GreenSyncInfo
{
	private String firstName;
	private String houseName;
	private String cityName;
	private String districtName;
	private Long contactNum;
	private String emailId;
	private String lastName;
	private String loginPassword;
	
	 private String roleName = "User";

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	
	private int id;

	GreenSyncInfo() {
		super();
		// TODO Auto-generated constructor stub
	}

	GreenSyncInfo(String firstName, String houseName, String cityName, String districtName, Long contactNum,
			String emailId, String lastName, String loginPassword, String roleName, int id) {
		super();
		this.firstName = firstName;
		this.houseName = houseName;
		this.cityName = cityName;
		this.districtName = districtName;
		this.contactNum = contactNum;
		this.emailId = emailId;
		this.lastName = lastName;
		this.loginPassword = loginPassword;
		this.roleName = roleName;
		this.id = id;
	}

	@Override
	public String toString() {
		return "GreenSyncInfo [firstName=" + firstName + ", houseName=" + houseName + ", cityName=" + cityName
				+ ", districtName=" + districtName + ", contactNum=" + contactNum + ", emailId=" + emailId + ", lastName="
				+ lastName + ", loginPassword=" + loginPassword + ", roleName=" + roleName + ", id=" + id + "]";
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getHouseName() {
		return houseName;
	}

	public void setHouseName(String houseName) {
		this.houseName = houseName;
	}

	public String getCityName() {
		return cityName;
	}

	public void setCityName(String cityName) {
		this.cityName = cityName;
	}

	public String getDistrictName() {
		return districtName;
	}

	public void setDistrictName(String districtName) {
		this.districtName = districtName;
	}

	public Long getContactNum() {
		return contactNum;
	}

	public void setContactNum(Long contactNum) {
		this.contactNum = contactNum;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getLoginPassword() {
		return loginPassword;
	}

	public void setLoginPassword(String loginPassword) {
		this.loginPassword = loginPassword;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	
	
	
}   