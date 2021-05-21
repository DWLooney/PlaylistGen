package com.dwlooney.youtubegen;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class SearchController {
	
	@Autowired
	private DBConnector connector = new DBConnector();
	
	private RestTemplate template = new RestTemplateBuilder().build();
	
	@Value("${spring.application.apiKey}")
	private String ytApiKey;
	
	private static final String relatedSearchUri = 
				"https://www.googleapis.com/youtube/v3/search?key={apiKey}&part={part}&type={videoType}&relatedToVideoId={relVideoId}";
	
	
	public String searchRelated(String videoId, String tags) {
		
		//Query db using connector to see if there is a cached result
		RelatedSearchResult existingResult = connector.getResults(videoId);
		System.out.println(existingResult);
		
		if (existingResult.getItems().size() == 0) {
			Map<String, String> uriMap = new HashMap<>();
			uriMap.put("apiKey", ytApiKey);
			uriMap.put("part", "snippet");
			uriMap.put("videoType", "video");
			uriMap.put("relVideoId", videoId);
			
			System.out.println(ytApiKey);
			existingResult = template.getForObject(relatedSearchUri, RelatedSearchResult.class, uriMap);
			existingResult.setSearchId(videoId);
			
			System.out.println("Generating new search results: " + existingResult);
			connector.putResult(existingResult);
		}
		
		return existingResult.toString();
		
	}
	//TODO stub
	private String filterResults() {
		return "";
	}
}
