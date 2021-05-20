package com.dwlooney.youtubegen;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface SearchRepository extends MongoRepository<RelatedSearchResult, String> {
	
	public RelatedSearchResult findByVideoId(String id);
	
}