package com.jobportal.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.demo.entity.Payment;
public interface PaymentRepository extends JpaRepository<Payment, Long>{
}





