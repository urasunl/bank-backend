package com.bank.controller;

import com.bank.entity.Transfer;
import com.bank.service.TransferService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transfer")
@RequiredArgsConstructor
public class TransferController {

    private final TransferService transferService;

    // 💸 Transfer oluştur
    @PostMapping
    public Transfer create(@RequestParam String from,
                           @RequestParam String to,
                           @RequestParam double amount){

        return transferService.createTransfer(from, to, amount);
    }

    // 📊 TÜM TRANSFERLER (Dashboard için)
    @GetMapping
    public List<Transfer> getAll(){
        return transferService.getAll();
    }

    // ✅ Onay (ADMIN)
    @PostMapping("/approve/{id}")
    public Transfer approve(@PathVariable Long id){
        return transferService.approve(id);
    }
}