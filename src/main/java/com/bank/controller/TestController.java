package com.bank.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class TestController {

    @GetMapping("/secure")
    public String secure(){
        return "Giriş başarılı, TOKEN doğru 🔥";
    }
}