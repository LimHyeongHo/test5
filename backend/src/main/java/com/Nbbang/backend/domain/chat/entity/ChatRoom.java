package com.Nbbang.backend.domain.chat.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "chat_room")
@Getter
@Setter
@NoArgsConstructor
public class ChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String buyerEmail;

    @Column(nullable = false)
    private String sellerEmail;

    @Column
    private Long productId;

    @Column
    private String productName;

    @Column(length = 500)
    private String lastMessage;

    @Column
    private LocalDateTime lastSentAt;

    @Column(nullable = false)
    private int buyerUnreadCount = 0;

    @Column(nullable = false)
    private int sellerUnreadCount = 0;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public static ChatRoom create(String buyerEmail, String sellerEmail, Long productId, String productName) {
        ChatRoom room = new ChatRoom();
        room.buyerEmail = buyerEmail;
        room.sellerEmail = sellerEmail;
        room.productId = productId;
        room.productName = productName;
        return room;
    }
}
