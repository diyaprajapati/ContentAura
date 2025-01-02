package com.ContentAura.cms_backend.project;

import com.ContentAura.cms_backend.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByUserId(String userId);

//    String user(User user);
}
