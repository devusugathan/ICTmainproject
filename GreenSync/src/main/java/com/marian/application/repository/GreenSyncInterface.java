  package com.marian.application.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.marian.application.model.GreenSyncInfo;

@Repository
public interface GreenSyncInterface extends JpaRepository<GreenSyncInfo, Integer> {

    // Custom query method to find a user by email ID
    GreenSyncInfo findByEmailId(String emailId);
}  