package com.dwlooney.youtubegen;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;

@JsonIgnoreProperties(ignoreUnknown=true)
public class RelatedSearchResult {
	
	@Id
	private int searchId;
	
	private VideoInfo[] items;
	private int totalResults;
	
	public RelatedSearchResult() {
		setItems(new VideoInfo[totalResults]);
	}

	public VideoInfo[] getItems() {
		return items;
	}

	public void setItems(VideoInfo[] items) {
		this.items = items;
	}
}
