//package com.jobportal.demo.service;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//import org.springframework.web.reactive.function.client.WebClient;
//import reactor.core.publisher.Mono;
//
//import java.util.List;
//import java.util.Map;
//
//@Service
//public class DeepSeekService {
//
//    private final WebClient webClient;
//
//    @Value("${openrouter.api.key}")
//    private String apiKey;
//
//    @Value("${openrouter.api.url}")
//    private String baseUrl;
//
//    public DeepSeekService(WebClient.Builder webClientBuilder) {
//        this.webClient = webClientBuilder.build();
//    }
//
//    public Mono<String> getChatCompletion(String userMessage) {
//        return webClient.post()
//                .uri(baseUrl + "/chat/completions")
//                .header("Authorization", "Bearer " + apiKey)
//                .header("Content-Type", "application/json")
//                .bodyValue(Map.of(
//                        "model", "deepseek/deepseek-chat-v3-0324:free", // Free model
//                        "messages", List.of(
//                                Map.of("role", "system", "content", "You are a helpful AI assistant."),
//                                Map.of("role", "user", "content", userMessage)
//                        )
//                ))
//                .retrieve()
//                .bodyToMono(Map.class)
//                .map(response -> {
//                    var choices = (List<Map<String, Object>>) response.get("choices");
//                    if (choices != null && !choices.isEmpty()) {
//                        return (String) ((Map) choices.get(0).get("message")).get("content");
//                    }
//                    return "No response from DeepSeek.";
//                });
//    }
//}

package com.jobportal.demo.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class DeepSeekService {

    private final WebClient webClient;

    @Value("${groq.api.model}")
    private String model;

    public DeepSeekService(WebClient webClient) {
        this.webClient = webClient;
    }

    public Mono<String> getChatCompletion(String message) {
        return webClient.post()
                .uri("/chat/completions")  // ✅ Correct endpoint
                .bodyValue("{\"model\": \"" + model + "\", " +
                           "\"messages\": [{\"role\": \"user\", \"content\": \"" + message + "\"}]}")
                .retrieve()
                .bodyToMono(String.class)
                .map(response -> {
                    // Extract response content safely
                    try {
                        com.fasterxml.jackson.databind.JsonNode root = 
                                new com.fasterxml.jackson.databind.ObjectMapper().readTree(response);
                        return root.path("choices").get(0).path("message").path("content").asText();
                    } catch (Exception e) {
                        return "Error parsing response: " + e.getMessage();
                    }
                });
    }
}
