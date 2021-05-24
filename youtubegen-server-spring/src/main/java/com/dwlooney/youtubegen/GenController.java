package com.dwlooney.youtubegen;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.dwlooney.youtubegen.components.Playlist;
import com.dwlooney.youtubegen.components.PlaylistVideo;
import com.dwlooney.youtubegen.components.RelatedSearchResult;
import com.dwlooney.youtubegen.components.VideoInfo;

@Component
public class GenController {
	
	@Autowired
	private DBConnector connector = new DBConnector();
	
	private RestTemplate template = new RestTemplateBuilder().build();
	
	@Value("${spring.application.apiKey}")
	private String ytApiKey;
	
	private static final String relatedSearchUri = 
				"https://www.googleapis.com/youtube/v3/search?key={apiKey}&part={part}&type={videoType}&relatedToVideoId={relVideoId}&maxResults={maxResults}";
	
	private static final String videoListUri =
				"https://www.googleapis.com/youtube/v3/videos?key={apiKey}&part={part}&id={idList}";
	
	
	private RelatedSearchResult doSearchRelated(String id, int amt) {
		//Query db using connector to see if there is a cached result
		RelatedSearchResult existingResult = connector.getResults(id, amt);
		System.out.println(existingResult);
		
		if (existingResult.getItems().size() == 0) {
			Map<String, String> uriMap = new HashMap<>();
			uriMap.put("apiKey", ytApiKey);
			uriMap.put("part", "snippet");
			uriMap.put("videoType", "video");
			uriMap.put("relVideoId", id);
			uriMap.put("maxResults", ((Integer) amt).toString());
			
			existingResult = template.getForObject(relatedSearchUri, RelatedSearchResult.class, uriMap);
			existingResult.setSearchId(id);

			connector.putResult(existingResult);
		}
		return existingResult;
	}
	
	private PlaylistVideo searchResultToPlaylistItem(VideoInfo item) {
		PlaylistVideo out = new PlaylistVideo();
		out.setChannelTitle(item.getChannelTitle());
		out.setDescription(item.getDescription());
		out.setPublishedAt(item.getPublishedAt());
		out.setThumbnail(item.getThumbnail());
		out.setTitle(item.getTitle());
		out.setVideoId(item.getVideoId());
		return out;
	}
	
	public String searchRelated(String videoId) {
		return doSearchRelated(videoId, 5).toString();
	}
	
	//Naive checking only (If a word has a space it will treat as 2 words
	private boolean containsTags(String theTags, String title) {
		if (theTags.equals("")) return true;
		theTags = theTags.toLowerCase();
		title = title.toLowerCase();
		boolean containsTag = false;
		List<String> words = new LinkedList<String>(Arrays.asList(title.split(" ")));
		List<String> tags = new LinkedList<String>(Arrays.asList(theTags.split(",")));
		//System.out.println("comparing: " + words + " with tags: " + tags);
		for( String tag : tags) {
			if (words.contains(tag)) {
				containsTag = true;
				//System.out.println("Words: " + words + " contains tag: " + tags);

			}
		}
		return containsTag;
	}
	
	public String generateList(String videoId, String tags, String amt) {
		int amount = Integer.parseInt(amt);
		int timeOut = 0;
		Playlist genList = new Playlist();
		Set<PlaylistVideo> resultSet = new HashSet<PlaylistVideo>();
		//Will search up to 4 times
		while (resultSet.size() < amount && timeOut < 4) {
			RelatedSearchResult res = doSearchRelated(videoId, 20);
			for (VideoInfo inf : res.getItems()) {
				PlaylistVideo toVideo = searchResultToPlaylistItem(inf);
				
				if (toVideo.getTitle() != null && containsTags(tags, toVideo.getTitle())){
					resultSet.add(toVideo);
				}
				
				if (resultSet.size() >= amount) {
					break;
				}
				//Get next set of results from closest related video (according to youtube anyway...)
				videoId = res.getItems().get(0).getVideoId();
				timeOut++;
			}
		}

		ArrayList<PlaylistVideo> results = new ArrayList<PlaylistVideo>();
		results.addAll(resultSet);
		
		genList.setVideos(results);
		
		return genList.toString();
		
	}
	
	public String insertPlaylist(String name, String idList) {
		//Get video info for each (new) id from API
		
		//Name cannot be empty
		if (name == "") {
			return "noName";
		}
		
		//Check if there is existing playlists
		Playlist existing = connector.getPlaylist(name);
		List<String> newIdsOld = new LinkedList<String>(Arrays.asList(idList.split(",")));
		List<String> newIds = new LinkedList<String>(Arrays.asList(idList.split(",")));
		StringBuilder newIdsUriBuilder = new StringBuilder();
		if (idList.length() == 0) {
			return "noIds";
		}
		Playlist newList = new Playlist();
		newList.setPlaylistName(name);
		for (PlaylistVideo vid : existing.getVideos()) {
				//Dont want to add existing video
					boolean containsId = false;
					//check to see if there is an id matching in videos
					for (String id : newIdsOld) {
						if (vid.getVideoId() == id) {
							containsId = true;
						}
					}
					
					if (containsId) {
						newList.getVideos().add(vid);
						newIds.remove(vid.getVideoId());
					}

		}
		if (newIds.size() > 1) {

			for (String id : newIds.subList(0, newIds.size() - 1)) {
				newIdsUriBuilder.append(id + ",");
			}
			newIdsUriBuilder.append(newIds.get(newIds.size() - 1));

		}
		
		if (newIds.size() == 1) {
			newIdsUriBuilder.append(newIds.get(newIds.size() - 1));
		} 
		if (newIds.size() > 0) {
			Map<String, String> uriMap = new HashMap<>();
			uriMap.put("apiKey", ytApiKey);
			uriMap.put("part", "snippet");
			uriMap.put("idList", newIdsUriBuilder.toString());
			
			System.out.println("URI: " + newIdsUriBuilder.toString());
			
			Playlist newListItems = template.getForObject(videoListUri, Playlist.class, uriMap);
			
			for (PlaylistVideo vid : newListItems.getVideos()) {
				newList.getVideos().add(vid);
			}
		}

		connector.savePlaylist(newList);
		
		return "success";
		
	}
	
	public String getPlaylist(String name) {
		Playlist existing = connector.getPlaylist(name);
		if (existing.getVideos().size() > 0) {
			existing.setPlaylistName(name);
			return existing.toString();
		}
		return new Playlist().toString();
	}
}
