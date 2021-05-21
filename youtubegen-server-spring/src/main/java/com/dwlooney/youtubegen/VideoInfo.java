package com.dwlooney.youtubegen;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;

import java.util.Map;

import org.springframework.data.annotation.Id;

@JsonIgnoreProperties(ignoreUnknown=true)
public class VideoInfo {
	
	private String videoId;
	
	private String publishedAt;
	private String title;
	private String description;
	private String channelTitle;
	private Thumbnail thumbnail;
	
	//Empty constructor for compiler warning
	public VideoInfo() {
		
	}
	@Id
	public String getVideoId() {
		return videoId;
	}

	@JsonProperty("snippet")
	private void unpackVideoDetails(JsonNode snippet) {
		this.publishedAt = snippet.get("publishedAt").asText();
		this.title = snippet.get("title").asText();
		this.description = snippet.get("description").asText().substring(0, 100) + "...";
		this.channelTitle = snippet.get("channelTitle").asText();
		JsonNode thumb = snippet.get("thumbnails").get("maxres");
		this.thumbnail = new Thumbnail(thumb.get("url").asText(), 
										thumb.get("width").asInt(), 
										thumb.get("height").asInt());
		
	}
	
	@JsonProperty("id")
	private void unpackVideoId(Map<String, String> idDetails) {
		this.videoId = idDetails.get("videoId");
	}
	
	public void setVideoId(String videoId) {
		this.videoId = videoId;
	}

	public String getPublishedAt() {
		return publishedAt;
	}

	public void setPublishedAt(String publishedAt) {
		this.publishedAt = publishedAt;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Thumbnail getThumbnail() {
		return thumbnail;
	}

	public void setThumbnail(Thumbnail thumbnail) {
		this.thumbnail = thumbnail;
	}

	public String getChannelTitle() {
		return channelTitle;
	}

	public void setChannelTitle(String channelTitle) {
		this.channelTitle = channelTitle;
	}
		
}
