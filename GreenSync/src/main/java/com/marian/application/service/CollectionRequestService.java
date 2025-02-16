package com.marian.application.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.marian.application.model.CollectionRequestInfo;

import com.marian.application.repository.CollectionRequestInterface;




@Service
public class CollectionRequestService {
	@Autowired
    public CollectionRequestInterface collectionrequestrepo;

    // Get all user data
    public List<CollectionRequestInfo> getAllCollectionRequest() {
        return collectionrequestrepo.findAll();
    }

    // Save data after hashing the password
    public CollectionRequestInfo saveCollectionRequest(CollectionRequestInfo collectionrequest) {
       

        // Save the data with the hashed password to the database
        return collectionrequestrepo.save(collectionrequest);
    }


    // Delete data by ID
    public String deleteCollectionRequest(int requestId) {
        if (collectionrequestrepo.existsById(requestId)) {
        	collectionrequestrepo.deleteById(requestId);
            return "Collection request Deleted";
        } else {
            return "Collection request Not Found!";
        }
    }

    public String updateCollectionRequest(int id,CollectionRequestInfo request)
    {
    	Optional<CollectionRequestInfo> req=collectionrequestrepo.findById(id);
    	if(req.isPresent()) //check whether employee is present or not, if present it will return true
    	{
    		CollectionRequestInfo existingReq=req.get();
    		existingReq.setStatusDes(request.getStatusDes());
    		existingReq.setReqStatus(request.getReqStatus());
    		
    		collectionrequestrepo.save(existingReq);
    		return "Data Updated!";
    		}
    	else
    	{
    		return "Data not Found!";
    	}
    }

}
