////
////
////package com.jobportal.demo.service;
////
////import org.springframework.core.io.FileSystemResource;
////import org.springframework.http.*;
////import org.springframework.stereotype.Service;
////import org.springframework.util.LinkedMultiValueMap;
////import org.springframework.util.MultiValueMap;
////import org.springframework.web.client.RestTemplate;
////
////import java.io.File;
////import java.util.HashMap;
////import java.util.Map;
////
////@Service
////public class ResumeScreeningService {
////
////    private final RestTemplate restTemplate = new RestTemplate();
////
////    public double computeMatchScore(String resumeFilePath, String jobDescription) {
////        String resumeText = extractTextFromPdf(resumeFilePath);
////        return getMatchScore(resumeText, jobDescription);
////    }
////
////    private String extractTextFromPdf(String filePath) {
////        String url = "http://localhost:5001/extract-resume-text";
////
////        FileSystemResource fileResource = new FileSystemResource(new File(filePath));
////
////        HttpHeaders headers = new HttpHeaders();
////        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
////
////        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
////        body.add("file", fileResource);
////
////        HttpEntity<MultiValueMap<String, Object>> request = new HttpEntity<>(body, headers);
////
////        ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);
////        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
////            return response.getBody().get("text").toString();
////        }
////
////        return "";
////    }
////
////    private double getMatchScore(String resumeText, String jobDescription) {
////        String url = "http://localhost:5001/match";
////
////        Map<String, String> payload = new HashMap<>();
////        payload.put("resume", resumeText);
////        payload.put("job", jobDescription);
////
////        HttpHeaders headers = new HttpHeaders();
////        headers.setContentType(MediaType.APPLICATION_JSON);
////        HttpEntity<Map<String, String>> entity = new HttpEntity<>(payload, headers);
////
////        ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);
////        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
////            Object score = response.getBody().get("score");
////            return Double.parseDouble(score.toString());
////        }
////
////        return 0.0;
////    }
////}
////
//
//
//package com.jobportal.demo.service;
//
//import org.springframework.core.io.FileSystemResource;
//import org.springframework.http.*;
//import org.springframework.stereotype.Service;
//import org.springframework.util.LinkedMultiValueMap;
//import org.springframework.util.MultiValueMap;
//import org.springframework.web.client.RestTemplate;
//
//import java.io.File;
//import java.util.HashMap;
//import java.util.Map;
//
//@Service
//public class ResumeScreeningService {
//
//    private final RestTemplate restTemplate = new RestTemplate();
//
//    // Combined method: returns both score and experience
//    public Map<String, Object> computeResumeInsights(String resumeFilePath, String jobDescription) {
//        String resumeText = extractTextFromPdf(resumeFilePath);
//
//        double matchScore = getMatchScore(resumeText, jobDescription);
//        int experience = getExperience(resumeText);
//
//        Map<String, Object> result = new HashMap<>();
//        result.put("score", matchScore);
//        result.put("experience", experience);
//        return result;
//    }
//
//    private String extractTextFromPdf(String filePath) {
//        String url = "http://localhost:5001/extract-resume-text";
//
//        FileSystemResource fileResource = new FileSystemResource(new File(filePath));
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
//
//        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
//        body.add("file", fileResource);
//
//        HttpEntity<MultiValueMap<String, Object>> request = new HttpEntity<>(body, headers);
//
//        ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);
//        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
//            return response.getBody().get("text").toString();
//        }
//
//        return "";
//    }
//
//    private double getMatchScore(String resumeText, String jobDescription) {
//        String url = "http://localhost:5001/match";
//
//        Map<String, String> payload = new HashMap<>();
//        payload.put("resume", resumeText);
//        payload.put("job", jobDescription);
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//        HttpEntity<Map<String, String>> entity = new HttpEntity<>(payload, headers);
//
//        ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);
//        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
//            Object score = response.getBody().get("score");
//            return Double.parseDouble(score.toString());
//        }
//
//        return 0.0;
//    }
//
//    private int getExperience(String resumeText) {
//        String url = "http://localhost:5001/experience";
//
//        Map<String, String> payload = new HashMap<>();
//        payload.put("resume_text", resumeText);
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//        HttpEntity<Map<String, String>> entity = new HttpEntity<>(payload, headers);
//
//        ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);
//        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
//            Object exp = response.getBody().get("experience");
//            return Integer.parseInt(exp.toString());
//        }
//
//        return 0;
//    }
//}



package com.jobportal.demo.service;

import org.springframework.core.io.FileSystemResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

@Service
public class ResumeScreeningService {

    private final RestTemplate restTemplate = new RestTemplate();

    // Combined method: returns both score and experience
    public Map<String, Object> computeResumeInsights(String resumeFilePath, String jobDescription) {
        String resumeText = extractTextFromPdf(resumeFilePath);

        double matchScore = getMatchScore(resumeText, jobDescription);
        int experience = getExperience(resumeText);

        Map<String, Object> result = new HashMap<>();
        result.put("score", matchScore);
        result.put("experience", experience);
        return result;
    }

    private String extractTextFromPdf(String filePath) {
        String url = "http://localhost:5001/extract-resume-text";

        FileSystemResource fileResource = new FileSystemResource(new File(filePath));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", fileResource);

        HttpEntity<MultiValueMap<String, Object>> request = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);
        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
            return response.getBody().get("text").toString();
        }

        return "";
    }

    private double getMatchScore(String resumeText, String jobDescription) {
        String url = "http://localhost:5001/match";

        Map<String, String> payload = new HashMap<>();
        payload.put("resume", resumeText);
        payload.put("job", jobDescription);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, String>> entity = new HttpEntity<>(payload, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);
        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
            Object score = response.getBody().get("score");
            return Double.parseDouble(score.toString());
        }

        return 0.0;
    }

//    private int getExperience(String resumeText) {
//        String url = "http://localhost:5001/experience";
//
//        Map<String, String> payload = new HashMap<>();
//        payload.put("resume_text", resumeText);
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//        HttpEntity<Map<String, String>> entity = new HttpEntity<>(payload, headers);
//
//        ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);
//        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
//            Object exp = response.getBody().get("experience");
//            return Integer.parseInt(exp.toString());
//        }
//
//        return 0;
//    }
    
    private int getExperience(String resumeText) {
        String url = "http://localhost:5001/experience";

        Map<String, String> payload = new HashMap<>();
        payload.put("resume_text", resumeText);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, String>> entity = new HttpEntity<>(payload, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);

        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
            Object exp = response.getBody().get("experience_years"); // ✅ correct key

            if (exp != null) {
                try {
                    return Integer.parseInt(exp.toString());
                } catch (NumberFormatException e) {
                    // Optional: log the exception
                }
            }
        }

        return 0;
    }


    // Separated methods for backward compatibility (optional)
    public double computeMatchScore(String resumeFilePath, String jobDescription) {
        String resumeText = extractTextFromPdf(resumeFilePath);
        return getMatchScore(resumeText, jobDescription);
    }

    public int extractExperience(String resumeFilePath) {
        String resumeText = extractTextFromPdf(resumeFilePath);
        return getExperience(resumeText);
    }
}

