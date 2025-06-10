package com.d1nvan.ai.prdassistant.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.d1nvan.ai.prdassistant.mapper.ChatMemoryMapper;
import com.d1nvan.ai.prdassistant.model.entity.ChatMemory;
import com.d1nvan.ai.prdassistant.service.ChatMemoryService;
import org.springframework.stereotype.Service;

@Service
public class ChatMemoryServiceImpl extends ServiceImpl<ChatMemoryMapper, ChatMemory> implements ChatMemoryService {
} 