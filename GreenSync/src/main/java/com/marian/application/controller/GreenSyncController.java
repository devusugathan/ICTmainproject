package com.marian.application.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import com.marian.application.model.GreenSyncInfo;
import com.marian.application.repository.GreenSyncInterface;  // Import the repository
import com.marian.application.service.GreenSyncService;

@RestController
@CrossOrigin(origins="https://localhost:3001")  // Fixed URL, assuming it's correct
public class GreenSyncController {

    @Autowired
    public GreenSyncService greensyncservice;

    @Autowired
    public GreenSyncInterface greensyncrepo;  // Injecting the repository

    @GetMapping("/api/data")  // Get all user data
    public List<GreenSyncInfo> showAllData() {
        return greensyncservice.getAllDatas();
    }

    @PostMapping("/api/adddata")  // Add new user data
    public GreenSyncInfo addData(@RequestBody GreenSyncInfo data) {
        return greensyncservice.saveData(data);
    }

    @DeleteMapping("/api/deletedata/{id}")  // Delete user data by ID
    public String removeData(@PathVariable int id) {
        return greensyncservice.deleteData(id);
    }

    @PutMapping("/api/updatedata/{id}")
    public String updateData(@PathVariable int id,@RequestBody GreenSyncInfo data)
    {
    	return greensyncservice.updateData(id,data);
    }
    
    // Backend: Modify the authenticateUser method to return the role
    @PostMapping("/api/authenticate")
    public ResponseEntity<?> authenticateUser(@RequestBody AuthRequest authRequest) {
        boolean isAuthenticated = greensyncservice.authenticateUser(authRequest.getEmail(), authRequest.getPassword());
        if (isAuthenticated) {
            // Use the injected repository to find the user by email
            GreenSyncInfo user = greensyncrepo.findByEmailId(authRequest.getEmail());
            return ResponseEntity.ok(user);  // Return the user object including the roleName
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }
    @GetMapping("/api/data/email")
    public ResponseEntity<GreenSyncInfo> getUserByEmail(@RequestParam String email) {
        GreenSyncInfo user = greensyncrepo.findByEmailId(email);  // Fetch user by email
        if (user != null) {
            return ResponseEntity.ok(user);  // Return the user object
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);  // Handle user not found
        }
    }

}
