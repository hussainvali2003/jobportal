package com.jobportal.demo.service;


import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Hex;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
@Service
public class PaymentService {
	
	   @Value("${razorpay.key_id}")
	    private String keyId;
	    @Value("${razorpay.key_secret}")
	    private String keySecret;
	   
	    public String createOrder(double amount) throws RazorpayException {
	        RazorpayClient client = new RazorpayClient(keyId, keySecret);
	        JSONObject orderRequest = new JSONObject();
	        orderRequest.put("amount", (int)(amount * 100)); // Amount in paise
	        orderRequest.put("currency", "INR");
	        orderRequest.put("receipt", "txn_" + System.currentTimeMillis());
	        Order order = client.orders.create(orderRequest);
	        return order.get("id");
	    }
	   
	    public boolean verifySignature(String orderId, String paymentId, String signature) throws Exception {
	        String payload = orderId + "|" + paymentId;
	        String actualSignature = hmacSha256(payload, keySecret);
	        return actualSignature.equals(signature);
	    }
	    private String hmacSha256(String data, String secret) throws Exception {
	        SecretKeySpec keySpec = new SecretKeySpec(secret.getBytes(), "HmacSHA256");
	        Mac mac = Mac.getInstance("HmacSHA256");
	        mac.init(keySpec);
	        byte[] hashBytes = mac.doFinal(data.getBytes());
	        return Hex.encodeHexString(hashBytes);
	    }
}