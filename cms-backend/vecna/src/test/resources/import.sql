CREATE TABLE schemas (
                         id BIGINT AUTO_INCREMENT PRIMARY KEY,
                         project_id BIGINT,
                         content TEXT,
                         created_at TIMESTAMP,
                         name VARCHAR(255),
                         FOREIGN KEY (project_id) REFERENCES projects(id)
);
