package com.bank.service;

import com.bank.entity.TransactionLog;
import com.bank.repository.TransactionLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class LogService {

    private final TransactionLogRepository logRepository;

    public void log(String username, String action, String details){

        TransactionLog log = new TransactionLog();
        log.setUsername(username);
        log.setAction(action);
        log.setDetails(details);
        log.setTimestamp(LocalDateTime.now());

        logRepository.save(log);
    }
}