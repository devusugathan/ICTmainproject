package com.marian.application.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.marian.application.model.StaffDutyInfo;
import com.marian.application.repository.StaffDutyInterface;
import com.marian.application.service.StaffDutyService;




@RestController
@CrossOrigin(origins="https://localhost:3001")
public class StaffDutyController
{

    @Autowired
    public StaffDutyService staffdutyservice;

    @Autowired
    public StaffDutyInterface staffdutyrepo;  // Injecting the repository

    @GetMapping("/api/staffduty")  // Get all user data
    public List<StaffDutyInfo> showAllStaffDuty() {
        return staffdutyservice.getAllStaffDuty();
    }

    @PostMapping("/api/addstaffduty")  // Add new user data
    public StaffDutyInfo addStaffDuty(@RequestBody StaffDutyInfo staffduty) {
        return staffdutyservice.saveStaffDuty(staffduty);
    }

    @DeleteMapping("/api/staffduty/{id}")  // Delete user data by ID
    public String removeStaffDuty(@PathVariable int id) {
        return staffdutyservice.deleteStaffDuty(id);
    }
    @PutMapping("/api/updatestaffduty/{id}")
    public String updateStaffDuty(@PathVariable int id,@RequestBody StaffDutyInfo duty)
    {
    	return staffdutyservice.updateStaffDuty(id,duty);
    }
   
}
