package com.jobportal.demo.service;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.text.similarity.LevenshteinDistance;
import org.springframework.stereotype.Service;


@Service
public class NLPService {
    
	  
    private static final Pattern NUMBER_PATTERN = Pattern.compile("\\d+");
    private static final LevenshteinDistance levenshteinDistance = LevenshteinDistance.getDefaultInstance();
    
    public Integer extractExperienceNumber(String experienceText) {
        if (experienceText == null || experienceText.trim().isEmpty()) {
            return null;
        }
        
        String cleanText = experienceText.toLowerCase().trim();
        
        // Handle common patterns
        if (cleanText.contains("fresher") || cleanText.contains("entry level")) {
            return 0;
        }
        
        // Extract first number found
        Matcher matcher = NUMBER_PATTERN.matcher(cleanText);
        if (matcher.find()) {
            try {
                return Integer.parseInt(matcher.group());
            } catch (NumberFormatException e) {
                return null;
            }
        }
        
        return null;
    }
    
    public double calculateSimilarity(String text1, String text2) {
        if (text1 == null || text2 == null) {
            return 0.0;
        }
        
        String clean1 = normalizeText(text1);
        String clean2 = normalizeText(text2);
        
        // Exact match
        if (clean1.equals(clean2)) {
            return 1.0;
        }
        
        // Token-based similarity
        return calculateTokenSimilarity(clean1, clean2);
    }
    
    private String normalizeText(String text) {
        return text.toLowerCase()
                .replaceAll("[^a-z0-9\\s]", "")
                .trim();
    }
    
    private double calculateTokenSimilarity(String text1, String text2) {
        String[] tokens1 = text1.split("\\s+");
        String[] tokens2 = text2.split("\\s+");
        
        Set<String> allTokens = new HashSet<>();
        allTokens.addAll(Arrays.asList(tokens1));
        allTokens.addAll(Arrays.asList(tokens2));
        
        if (allTokens.isEmpty()) {
            return 0.0;
        }
        
        int matches = 0;
        for (String token1 : tokens1) {
            for (String token2 : tokens2) {
                if (isFuzzyMatch(token1, token2, 0.8)) {
                    matches++;
                    break;
                }
            }
        }
        
        return (double) matches / allTokens.size();
    }
    
    boolean isFuzzyMatch(String str1, String str2, double threshold) {
        int maxLength = Math.max(str1.length(), str2.length());
        if (maxLength == 0) return false;
        
        int distance = levenshteinDistance.apply(str1, str2);
        double similarity = 1.0 - (double) distance / maxLength;
        return similarity >= threshold;
    }
    
    public boolean matchesLocation(String jobLocation, String searchLocation) {
        if (searchLocation == null || searchLocation.trim().isEmpty()) {
            return true;
        }
        
        if (jobLocation == null) {
            return false;
        }
        
        String cleanJobLocation = jobLocation.toLowerCase().trim();
        String cleanSearchLocation = searchLocation.toLowerCase().trim();
        
        // Direct contains match
        if (cleanJobLocation.contains(cleanSearchLocation)) {
            return true;
        }
        
        // Fuzzy match for location parts
        String[] jobParts = cleanJobLocation.split("[,\\-\\s]+");
        String[] searchParts = cleanSearchLocation.split("[,\\-\\s]+");
        
        for (String searchPart : searchParts) {
            for (String jobPart : jobParts) {
                if (isFuzzyMatch(jobPart, searchPart, 0.8)) {
                    return true;
                }
            }
        }
        
        return false;
    }
}