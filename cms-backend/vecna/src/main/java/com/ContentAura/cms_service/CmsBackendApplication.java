package com.ContentAura.cms_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class CmsBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(CmsBackendApplication.class, args);
	}

}
