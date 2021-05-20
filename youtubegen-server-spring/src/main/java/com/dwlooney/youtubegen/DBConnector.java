package com.dwlooney.youtubegen;

import org.springframework.beans.factory.annotation.Autowired;
public class DBConnector {

	@Autowired
	private SearchRepository repo;
	
	//Empty constructor for compiler warning purposes
	public DBConnector() {
	}
	
	
	public RelatedSearchResult getResults(String id) {
		if(!repo.existsById(id)) {
			//API Call here
			
		}
		return new RelatedSearchResult();
	}
	
}
