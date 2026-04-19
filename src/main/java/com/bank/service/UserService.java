package com.bank.service;

import com.bank.dto.RegisterRequest;
import com.bank.dto.LoginRequest;
import com.bank.entity.User;
import com.bank.repository.UserRepository;
import com.bank.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    // REGISTER
    public User register(RegisterRequest request){

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());

        return userRepository.save(user);
    }

    // LOGIN (JWT)
    public String login(LoginRequest request){

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())){
            throw new RuntimeException("Wrong password");
        }

        return jwtService.generateToken(
                user.getUsername(),
                user.getRole().name()   // 🔥 ROLE BURADA
        );
    }
}