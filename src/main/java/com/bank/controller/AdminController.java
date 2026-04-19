package com.bank.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @GetMapping("/panel")
    public String admin(){
        return "ADMIN PANEL 🔥";
    }
}