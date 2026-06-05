package com.Nbbang.backend.domain.auth.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "pki_table")
@Getter
@Setter
public class DeviceCert {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(nullable = false)
    private String ciHash;

    @Column(columnDefinition = "TEXT")
    private String publicKey;

    @Column(nullable = false, unique = true)
    private String deviceId;

    @Column
    private String certificateSerialNumber;

    @Column
    private boolean revoked = false;

    @Column
    private String password; 
}
