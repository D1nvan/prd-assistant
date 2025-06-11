package com.d1nvan.ai.prdassistant.util;

public class TaskIdGenerator {
    public static String generate() {
        return "TASK-" + System.currentTimeMillis();
    }
}