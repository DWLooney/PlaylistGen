package com.dwlooney.youtubegen;

import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class SearchController {
	@GetMapping("/search")
	public String search(@RequestParam(value= "videoID", defaultValue = "") String videoID) {
		return "";
	}
}
