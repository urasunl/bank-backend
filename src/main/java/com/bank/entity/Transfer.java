package com.bank.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Transfer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fromUser;
    private String toUser;
    private double amount;
    private boolean flagged;
    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    private TransferStatus status;
}