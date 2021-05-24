package com.dwlooney.youtubegen;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.dwlooney.youtubegen.components.Playlist;
import com.dwlooney.youtubegen.components.RelatedSearchResult;

@Component
public class DBConnector {

	@Autowired
	private SearchRepository searchRepo;
	
	@Autowired
	private PlaylistRepository playlistRepo;
	
	public RelatedSearchResult getResults(String searchId, int amt) {
		Optional<RelatedSearchResult> out;
		RelatedSearchResult res;
		out = searchRepo.findBySearchId(searchId);
		if (out.isEmpty()) {
			res = new RelatedSearchResult();
		} else {
			if (out.get().getTotalResults() != amt) {
				res = new RelatedSearchResult();
			} else {
				res = out.get();
			}

		}
		return res;
	}
	
	public void putResult(RelatedSearchResult result) {
		System.out.println("Putting Search Result:");
		searchRepo.save(result);
	}
	
	public Playlist getPlaylist(String name) {
		 Optional<Playlist> out;
		 Playlist res;
		 
		 out = playlistRepo.findByPlaylistName(name);
		 if (out.isEmpty()) {
			 res = new Playlist();
			 
		 } else {
			 res = out.get();
		 }
		 return res;
		 
	}
	
	public void savePlaylist(Playlist List) {
		System.out.println("Saving playlist:" + List);
		playlistRepo.save(List);
		
	}
}