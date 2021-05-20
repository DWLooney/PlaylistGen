package com.dwlooney.youtubegen;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

public class SearchController {
	private String searchType = "";
	
	public SearchController() {
		
	}
	
	@Bean
	public RestTemplate restTemplate(RestTemplateBuilder builder) {
		return builder.build();
	}
	
	@Bean
	public String searchRelated(String videoId, String tags) {
		RelatedSearchResult res = restTemplate.getForObject
		
	}
	
	//TODO stub
	private String filterResults() {
		return "";
	}
}
