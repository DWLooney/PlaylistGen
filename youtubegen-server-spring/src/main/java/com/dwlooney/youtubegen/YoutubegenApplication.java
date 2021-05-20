package com.dwlooney.youtubegen;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@RestController
public class YoutubegenApplication {
	
	private DBConnector repoConnector = new DBConnector();
	
	private String apiKey;
	
	public static void main(String[] args) {
		if (args.length == 0) {
			System.out.println("Youtube API key must be provided to run the microservice!");
			System.out.println("Exiting...");
			
			return;
		} else {
			SpringApplication.run(YoutubegenApplication.class, args);
		}

	}
	
	
	@GetMapping("/hello")
	public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
		return String.format("Hello %s!", name);
	}
	
	@GetMapping("/ytRelated")
	public String getRelatedResults(@RequestParam(value="id", defaultValue = "") String videoID,
									@RequestParam(value="tags", defaultValue = "") String filterTags) {
		return "";
	}
	

}
