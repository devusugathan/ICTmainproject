package com.marian.application.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.marian.application.model.CategoryInfo;



@Repository
public interface CategoryInterface extends JpaRepository<CategoryInfo, Integer>{
	
}
