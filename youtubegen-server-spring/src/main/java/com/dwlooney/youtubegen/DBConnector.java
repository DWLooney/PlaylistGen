package com.dwlooney.youtubegen;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DBConnector {

	@Autowired
	private SearchRepository repo;
	
	public RelatedSearchResult getResults(String searchId) {
		Optional<RelatedSearchResult> out;
		RelatedSearchResult res;
		out = repo.findBySearchId(searchId);
		if (out.isEmpty()) {
			res = new RelatedSearchResult();
		} else {
			res = out.get();
		}
		return res;
	}
	
	public void putResult(RelatedSearchResult result) {
		System.out.println("Putting Search Result:");
		repo.save(result);
	}
}