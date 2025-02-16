package com.marian.application.service;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.mindrot.jbcrypt.BCrypt;


import com.marian.application.model.GreenSyncInfo;
import com.marian.application.repository.GreenSyncInterface;
@Service
public class GreenSyncService {

    @Autowired
    public GreenSyncInterface greensyncrepo;

    // Get all user data
    public List<GreenSyncInfo> getAllDatas() {
        return greensyncrepo.findAll();
    }

    // Save data after hashing the password
    public GreenSyncInfo saveData(GreenSyncInfo data) {
        // Hash the password before saving it to the database
    	String hashedPassword = BCrypt.hashpw(data.getLoginPassword(), BCrypt.gensalt(12));
    	data.setLoginPassword(hashedPassword);  // Store hashed password

        // Save the data with the hashed password to the database
        return greensyncrepo.save(data);
    }


    // Delete data by ID
    public String deleteData(int dataId) {
        if (greensyncrepo.existsById(dataId)) {
            greensyncrepo.deleteById(dataId);
            return "Data Deleted";
        } else {
            return "Data Not Found!";
        }
    }
    
    public String updateData(int id,GreenSyncInfo data)
    {
    	Optional<GreenSyncInfo> dat=greensyncrepo.findById(id);
    	if(dat.isPresent()) //check whether employee is present or not, if present it will return true
    	{
    		GreenSyncInfo existingDat=dat.get();
    		existingDat.setFirstName(data.getFirstName());
    		existingDat.setDistrictName(data.getDistrictName());
    		existingDat.setHouseName(data.getHouseName());
    		existingDat.setCityName(data.getCityName());
    		existingDat.setContactNum(data.getContactNum());
    		existingDat.setEmailId(data.getEmailId());
    		existingDat.setLastName(data.getLastName());
    		
    		greensyncrepo.save(existingDat);
    		return "Data Updated!";
    		}
    	else
    	{
    		return "Data not Found!";
    	}
    }
    
    // Method to compare the given password with the hashed password stored in the database
    public boolean authenticateUser(String email, String password) {
        GreenSyncInfo user = greensyncrepo.findByEmailId(email);
        if (user != null) {
            String storedHashedPassword = user.getLoginPassword();
            System.out.println("Stored Hash: " + storedHashedPassword); // Log stored hash
            System.out.println("Entered Password: " + password); // Log entered password

            // Check if the password matches the stored hashed password
            boolean match = BCrypt.checkpw(password, storedHashedPassword);
            System.out.println("Password Match: " + match); // Log the result

            return match;
        }
        return false;  // User not found
    }


}
