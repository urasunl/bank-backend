package com.bank.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/employee")
public class EmployeeController {

    @GetMapping("/panel")
    public String employee(){
        return "EMPLOYEE PANEL 👍";
    }
}