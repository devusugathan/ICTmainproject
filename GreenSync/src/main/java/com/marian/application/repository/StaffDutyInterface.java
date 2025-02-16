package com.marian.application.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.marian.application.model.StaffDutyInfo;

@Repository
public interface StaffDutyInterface extends JpaRepository<StaffDutyInfo, Integer> {
	Optional<StaffDutyInfo> findByStaffId(int staffId);

}
