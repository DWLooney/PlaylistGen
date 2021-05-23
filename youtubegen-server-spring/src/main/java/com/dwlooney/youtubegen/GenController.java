package com.dwlooney.youtubegen;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.dwlooney.youtubegen.components.Playlist;
import com.dwlooney.youtubegen.components.PlaylistVideo;
import com.dwlooney.youtubegen.components.RelatedSearchResult;

@Component
public class GenController {
	
	@Autowired
	private DBConnector connector = new DBConnector();
	
	private RestTemplate template = new RestTemplateBuilder().build();
	
	@Value("${spring.application.apiKey}")
	private String ytApiKey;
	
	private static final String relatedSearchUri = 
				"https://www.googleapis.com/youtube/v3/search?key={apiKey}&part={part}&type={videoType}&relatedToVideoId={relVideoId}";
	
	private static final String videoListUri =
				"https://www.googleapis.com/youtube/v3/videos?key={apiKey}&part={part}&id={idList}";
	
	
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
			
			existingResult = template.getForObject(relatedSearchUri, RelatedSearchResult.class, uriMap);
			existingResult.setSearchId(videoId);
			
			System.out.println("Generating new search results: " + existingResult);
			connector.putResult(existingResult);
		}
		
		return existingResult.toString();
		
	}
	
	public String generateList(String videoId, String tags, String amt) {
		int amount = Integer.parseInt(amt);
		return "";
		
	}
	
	public String insertPlaylist(String name, String idList) {
		//Get video info for each (new) id from API
		
		//Name cannot be empty
		if (name == "") {
			return "noName";
		}
		
		//Check if there is existing playlists
		Playlist existing = connector.getPlaylist(name);
		existing.setPlaylistName(name);
		List<String> newIds = new LinkedList<String>(Arrays.asList(idList.split(",")));
		StringBuilder newIdsUriBuilder = new StringBuilder();
		if (idList.length() == 0) {
			return "noIds";
		}
		System.out.println(newIds.size());
		
		for (PlaylistVideo vid : existing.getVideos()) {
				//Dont want to add existing video
				newIds.remove(vid.getVideoId());
		}
		if (newIds.size() > 1) {

			for (String id : newIds.subList(0, newIds.size() - 1)) {
				newIdsUriBuilder.append(id + ",");
			}
			newIdsUriBuilder.append(newIds.get(newIds.size() - 1));

		} else if (newIds.size() == 0) {
			return "noIds";
		}
		
		if (newIds.size() == 1) {
			newIdsUriBuilder.append(newIds.get(newIds.size() - 1));
		} 
		
		Map<String, String> uriMap = new HashMap<>();
		uriMap.put("apiKey", ytApiKey);
		uriMap.put("part", "snippet");
		uriMap.put("idList", newIdsUriBuilder.toString());
		
		System.out.println("URI: " + newIdsUriBuilder.toString());
		
		Playlist newListItems = template.getForObject(videoListUri, Playlist.class, uriMap);
		
		for (PlaylistVideo vid : newListItems.getVideos()) {
			existing.getVideos().add(vid);
		}
		
		connector.savePlaylist(existing);
		
		return "success";
		
	}
	
	public String getPlaylist(String name) {
		Playlist existing = connector.getPlaylist(name);
		if (existing.getVideos().size() > 0) {
			return existing.toString();
		}
		return new Playlist().toString();
	}
	
	//TODO stub
	private String filterResults() {
		return "";
	}
}
