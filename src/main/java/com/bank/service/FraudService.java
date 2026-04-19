package com.bank.service;

import org.springframework.stereotype.Service;

@Service
public class FraudService {

    public boolean isFraud(String fromUser, double amount){

        // 🔥 basit kural
        if(amount > 150000){
            return true;
        }

        return false;
    }
}