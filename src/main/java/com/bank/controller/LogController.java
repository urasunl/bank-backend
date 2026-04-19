package com.bank.controller;

import com.bank.entity.TransactionLog;
import com.bank.repository.TransactionLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/logs")
@RequiredArgsConstructor
public class LogController {

    private final TransactionLogRepository logRepository;

    @GetMapping
    public List<TransactionLog> getLogs(){
        return logRepository.findAll();
    }
}