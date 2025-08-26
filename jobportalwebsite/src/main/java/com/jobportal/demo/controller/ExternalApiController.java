package com.jobportal.demo.controller;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
@RestController
@RequestMapping("/api/external")
public class ExternalApiController {
    @GetMapping("/jobs")
    public ResponseEntity<?> fetchJobsFromExternalApi() {
        RestTemplate restTemplate = new RestTemplate();
        String url = "http://localhost:8080/api/jobs"; // external API
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return ResponseEntity.ok(response.getBody());
    }
}