package com.dwlooney.youtubegen;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.dwlooney.youtubegen.components.Playlist;

@Repository
public interface PlaylistRepository extends MongoRepository<Playlist, String>{
	
	public Optional<Playlist> findByPlaylistName(String playlistName);
	
	
}
