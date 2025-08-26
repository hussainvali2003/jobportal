//package com.jobportal.demo.controller;
//
//  
//import org.springframework.web.bind.annotation.*;
//
//import com.jobportal.demo.entity.ChatRequest;
//import com.jobportal.demo.entity.ChatResponse;
//import com.jobportal.demo.service.DeepSeekService;
//
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/deepseek")
//@CrossOrigin(origins = "http://localhost:3000")// Allow frontend calls (React, etc.)
//public class DeepSeekController {
//
//    private final DeepSeekService deepSeekService;
//
//    public DeepSeekController(DeepSeekService deepSeekService) {
//        this.deepSeekService = deepSeekService;
//    }
//
//    @PostMapping("/chat")
//    public ChatResponse chat(@RequestBody ChatRequest request) {
//        String reply = deepSeekService.getChatCompletion(request.getMessage()).block();
//        return new ChatResponse(reply);
//    }
//}

package com.jobportal.demo.controller;

import org.springframework.web.bind.annotation.*;
import com.jobportal.demo.entity.ChatRequest;
import com.jobportal.demo.entity.ChatResponse;
import com.jobportal.demo.service.DeepSeekService;

@RestController
@RequestMapping("/api/groq")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend calls
public class DeepSeekController {

    private final DeepSeekService groqService;

    public DeepSeekController(DeepSeekService groqService) {
        this.groqService = groqService;
    }

    @PostMapping("/chat")
    public ChatResponse chat(@RequestBody ChatRequest request) {
        String reply = groqService.getChatCompletion(request.getMessage()).block();
        return new ChatResponse(reply);
    }
}
