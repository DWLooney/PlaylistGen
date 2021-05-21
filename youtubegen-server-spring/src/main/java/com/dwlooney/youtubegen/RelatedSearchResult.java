package com.dwlooney.youtubegen;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.data.annotation.Id;

@JsonIgnoreProperties(ignoreUnknown=true)
public class RelatedSearchResult {
	
	@Id
	private String searchId;
	
	
	private List<VideoInfo> items;
	
	private int totalResults;
	
	@JsonProperty("pageInfo")
	private void setPageInfo(Map<String, Integer> pageInfo) {
		this.totalResults = pageInfo.get("resultsPerPage");
	}
	
	public RelatedSearchResult() {
		this.items = new ArrayList<>();
	}

	public String getSearchId() {
		return searchId;
	}

	public void setSearchId(String searchId) {
		this.searchId = searchId;
	}

	public int getTotalResults() {
		return totalResults;
	}

	public void setTotalResults(int totalResults) {
		this.totalResults = totalResults;
	}

	public List<VideoInfo> getItems() {
		return items;
	}

	public void setItems(List<VideoInfo> items) {
		this.items = items;
	}
	
	@Override
	public String toString() {
		try {
			return new ObjectMapper().writeValueAsString(this);
		} catch (JsonProcessingException e) {
			System.err.println("Error printing to string");
		}
		return "";
	}
	
}
