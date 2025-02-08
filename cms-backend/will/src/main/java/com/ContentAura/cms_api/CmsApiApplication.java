package com.ContentAura.cms_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = {
		"com.ContentAura.cms_api",    // your current package
		"com.ContentAura.cms_service", // add this to scan service package
		"com.ContentAura.cms_service.auth"  // add this to scan service package
})
@EntityScan({
		"com.ContentAura.cms_service", // for entities from first backend
})
@EnableJpaRepositories({
		"com.ContentAura.cms_service", // for repositories from first backend
})
public class CmsApiApplication {
	public static void main(String[] args) {
		SpringApplication.run(CmsApiApplication.class, args);
	}
}