package com.d1nvan.ai.prdassistant;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import lombok.extern.slf4j.Slf4j;

@SpringBootApplication
@EnableAsync
@MapperScan("com.d1nvan.ai.prdassistant.mapper")
@EnableWebMvc
@Slf4j
public class PrdAssistant {

	public static void main(String[] args) {
		SpringApplication.run(PrdAssistant.class, args);
	}

}
