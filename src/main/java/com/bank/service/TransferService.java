package com.bank.service;

import com.bank.entity.*;
import com.bank.repository.TransferRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransferService {

    private final TransferRepository transferRepository;
    private final LogService logService;
    private final FraudService fraudService;

    // 📊 TÜM TRANSFERLER (Dashboard için)
    public List<Transfer> getAll(){
        return transferRepository.findAll();
    }

    // 💸 Transfer oluştur
    public Transfer createTransfer(String from, String to, double amount){

        Transfer transfer = new Transfer();
        transfer.setFromUser(from);
        transfer.setToUser(to);
        transfer.setAmount(amount);

        // 🕒 ZAMAN (grafik için)
        transfer.setCreatedAt(LocalDateTime.now());

        // 🚨 FRAUD CHECK
        boolean fraud = fraudService.isFraud(from, amount);
        transfer.setFlagged(fraud);

        // 🔥 YENİ MANTIK (GERÇEK BANKA)
        // herkes önce PENDING
        transfer.setStatus(TransferStatus.PENDING);

        Transfer saved = transferRepository.save(transfer);

        // 📜 LOG
        logService.log(from, "TRANSFER_CREATE",
                "To: " + to + ", Amount: " + amount + ", Fraud: " + fraud);

        return saved;
    }

    // ✅ ADMIN onay
    public Transfer approve(Long id){

        Transfer t = transferRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transfer not found"));

        // zaten onaylıysa tekrar yapma
        if(t.getStatus() == TransferStatus.APPROVED){
            return t;
        }

        t.setStatus(TransferStatus.APPROVED);

        // 📜 LOG
        logService.log("ADMIN", "TRANSFER_APPROVE",
                "Transfer ID: " + id);

        return transferRepository.save(t);
    }
}