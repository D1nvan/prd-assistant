package com.d1nvan.ai.prdassistant.model.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.d1nvan.ai.prdassistant.enums.ChatMemoryType;
import lombok.Data;

@Data
@TableName("chat-memory")
public class ChatMemory {
    private String conversationId;
    
    private String content;
    
    private ChatMemoryType type;
    
    private Double timestamp;
} 