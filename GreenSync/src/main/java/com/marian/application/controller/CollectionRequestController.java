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

import com.marian.application.model.CollectionRequestInfo;

import com.marian.application.repository.CollectionRequestInterface;
import com.marian.application.service.CollectionRequestService;






@RestController
@CrossOrigin(origins="https://localhost:3001")
public class CollectionRequestController
{

    @Autowired
    public CollectionRequestService collectionrequestservice;

    @Autowired
    public CollectionRequestInterface collectionrequestrepo;  // Injecting the repository

    @GetMapping("/api/collectionrequest")  // Get all user data
    public List<CollectionRequestInfo> showAllCollectionRequest() {
        return collectionrequestservice.getAllCollectionRequest();
    }

    @PostMapping("/api/addcollectionrequest")  // Add new user data
    public CollectionRequestInfo addCollectionRequest(@RequestBody CollectionRequestInfo collectionrequest) {
        return collectionrequestservice.saveCollectionRequest(collectionrequest);
    }

    @DeleteMapping("/api/collectionrequest/{id}")  // Delete user data by ID
    public String removeCollectionRequest(@PathVariable int id) {
        return collectionrequestservice.deleteCollectionRequest(id);
    }

    @PutMapping("/api/updatecollectionrequest/{id}")
    public String updateCollectionRequest(@PathVariable int id,@RequestBody CollectionRequestInfo request)
    {
    	return collectionrequestservice.updateCollectionRequest(id,request);
    }

   
}

