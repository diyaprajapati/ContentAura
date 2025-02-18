package com.ContentAura.cms_service.project;

import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class ProjectEvent extends ApplicationEvent {
    private final Integer userId;
    private final boolean isCreated;

    public ProjectEvent(Object source, Integer userId, boolean isCreated) {
        super(source);
        this.userId = userId;
        this.isCreated = isCreated;
    }
}