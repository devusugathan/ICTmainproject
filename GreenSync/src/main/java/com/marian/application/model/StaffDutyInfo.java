package com.marian.application.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
@Entity
public class StaffDutyInfo {
	 private String dutyStatus="Nothing Assigned";
	 private int assignedDutyId=0;
	 private int staffId;
		@Id
		@GeneratedValue(strategy=GenerationType.IDENTITY)
		
		private int dutyId;
		StaffDutyInfo() {
			super();
			// TODO Auto-generated constructor stub
		}
		StaffDutyInfo(String dutyStatus, int assignedDutyId, int staffId, int dutyId) {
			super();
			this.dutyStatus = dutyStatus;
			this.assignedDutyId = assignedDutyId;
			this.staffId = staffId;
			this.dutyId = dutyId;
		}
		@Override
		public String toString() {
			return "StaffDutyInfo [dutyStatus=" + dutyStatus + ", assignedDutyId=" + assignedDutyId + ", staffId="
					+ staffId + ", dutyId=" + dutyId + "]";
		}
		public String getDutyStatus() {
			return dutyStatus;
		}
		public void setDutyStatus(String dutyStatus) {
			this.dutyStatus = dutyStatus;
		}
		public int getAssignedDutyId() {
			return assignedDutyId;
		}
		public void setAssignedDutyId(int assignedDutyId) {
			this.assignedDutyId = assignedDutyId;
		}
		public int getStaffId() {
			return staffId;
		}
		public void setStaffId(int staffId) {
			this.staffId = staffId;
		}
		public int getDutyId() {
			return dutyId;
		}
		public void setDutyId(int dutyId) {
			this.dutyId = dutyId;
		}
		
		
}
