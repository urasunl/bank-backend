package com.bank.controller;

import com.bank.dto.RegisterRequest;
import com.bank.dto.LoginRequest;
import com.bank.dto.LoginResponse;
import com.bank.entity.User;
import com.bank.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    // REGISTER
    @PostMapping("/register")
    public User register(@RequestBody RegisterRequest request){
        return userService.register(request);
    }

    // LOGIN (JWT)
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request){
        String token = userService.login(request);
        return new LoginResponse(token);
    }
}