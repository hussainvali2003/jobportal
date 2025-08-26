package com.jobportal.demo.controller;


import java.util.Collections;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobportal.demo.service.PaymentService;
import com.razorpay.RazorpayException;
@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;
    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(@RequestBody Map<String, Double> request) throws RazorpayException {
        double amount = request.get("amount");
        String orderId = paymentService.createOrder(amount);
        return ResponseEntity.ok(Collections.singletonMap("orderId", orderId));
    }
    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(@RequestBody Map<String, String> request) throws Exception {
        boolean valid = paymentService.verifySignature(
                request.get("orderId"),
                request.get("paymentId"),
                request.get("signature")
        );
        return ResponseEntity.ok(Collections.singletonMap("valid", valid));
    }
}