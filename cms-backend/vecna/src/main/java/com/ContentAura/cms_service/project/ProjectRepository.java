package com.ContentAura.cms_service.project;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByUserId(Integer userId);

//    @Query("SELECT COUNT(p) FROM Project p WHERE p.user.id = :userId")
//    Long countByUserId(@Param("userId") Integer userId);

}
