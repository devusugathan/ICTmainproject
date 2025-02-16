package com.marian.application.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.marian.application.model.StaffDutyInfo;
import com.marian.application.repository.StaffDutyInterface;




@Service
public class StaffDutyService {
	@Autowired
    public StaffDutyInterface staffdutyrepo;

    // Get all user data
    public List<StaffDutyInfo> getAllStaffDuty() {
        return staffdutyrepo.findAll();
    }

    // Save data after hashing the password
    public StaffDutyInfo saveStaffDuty(StaffDutyInfo staffduty) {
       

        // Save the data with the hashed password to the database
        return staffdutyrepo.save(staffduty);
    }


    // Delete data by ID
    public String deleteStaffDuty(int staffdutyId) {
        if (staffdutyrepo.existsById(staffdutyId)) {
        	staffdutyrepo.deleteById(staffdutyId);
            return "staff duty Deleted";
        } else {
            return "staff duty Not Found!";
        }
    }

    public String updateStaffDuty(int staffId, StaffDutyInfo duty) {
        Optional<StaffDutyInfo> dut = staffdutyrepo.findByStaffId(staffId); // Find by staffId instead

        if (dut.isPresent()) { // Check if staff exists
            StaffDutyInfo existingDut = dut.get();
            existingDut.setAssignedDutyId(duty.getAssignedDutyId());
            existingDut.setDutyStatus(duty.getDutyStatus());

            staffdutyrepo.save(existingDut);
            return "Data Updated!";
        } else {
            return "Data not Found!";
        }
    }

 

}
