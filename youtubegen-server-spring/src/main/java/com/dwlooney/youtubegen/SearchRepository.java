package com.dwlooney.youtubegen;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.dwlooney.youtubegen.components.RelatedSearchResult;

@Repository
public interface SearchRepository extends MongoRepository<RelatedSearchResult, String> {
	
	public Optional<RelatedSearchResult> findBySearchId(String searchId);
	
	
}