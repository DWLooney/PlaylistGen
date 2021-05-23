package com.dwlooney.youtubegen.components;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@JsonIgnoreProperties(ignoreUnknown=true)
public class Playlist {
	
	@Id
	private String playlistName;
	
	@JsonProperty("items")
	private List<PlaylistVideo> videos;
	
	public Playlist() {
		this.videos = new ArrayList<PlaylistVideo>();
	}
	
	public String getPlaylistName() {
		return playlistName;
	}

	public void setPlaylistName(String playlistName) {
		this.playlistName = playlistName;
	}

	public List<PlaylistVideo> getVideos() {
		return videos;
	}

	public void setVideos(List<PlaylistVideo> videos) {
		this.videos = videos;
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
