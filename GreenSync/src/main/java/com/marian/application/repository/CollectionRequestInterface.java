package com.marian.application.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.marian.application.model.CollectionRequestInfo;


@Repository
public interface CollectionRequestInterface extends JpaRepository<CollectionRequestInfo, Integer>{

}
