package com.dwlooney.youtubegen;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.context.annotation.Bean;

@SuppressWarnings("unused")
@SpringBootApplication
@RestController
public class YoutubegenApplication {
	
	@Autowired
	private GenController controller;
	
	@Value("${spring.application.apiKey}")
	private static String apiKey;
	
	public static void main(String[] args) {
		if (apiKey == "") {
			System.err.println("Youtube API key must be provided to run the service!");
			System.err.println("Exiting...");
			
			return;
		} else {
			SpringApplication.run(YoutubegenApplication.class, args);
		}

	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/hello")
	public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
		return String.format("Hello %s!", name);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/ytRelated")
	public String getRelatedResults(@RequestParam(value="id", defaultValue = "") String videoID,
									@RequestParam(value="tags", defaultValue = "") String filterTags) {
		return controller.searchRelated(videoID);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/ytGenerate")
	public String generatePlaylist(@RequestParam(value="id", defaultValue = "") String videoID,
									@RequestParam(value="tags", defaultValue = "") String filterTags,
									@RequestParam(value="amount", defaultValue = "10") String amt) {
		return controller.generateList(videoID, filterTags, amt);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/saveplaylist")
	public String saveResults(@RequestParam(value="name", defaultValue = "") String name,
			@RequestParam(value="ids", defaultValue = "") String ids) {
		
		return controller.insertPlaylist(name, ids);
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/getplaylist")
	public String getPlaylist(@RequestParam(value="name", defaultValue = "") String name) {
		
		return controller.getPlaylist(name);
	}

}
