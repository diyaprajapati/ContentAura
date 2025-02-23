package com.ContentAura.cms_service.api_request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class OverviewDataPoint {
    private String time;
    private int projectRequests;
    private int schemaRequests;

    public OverviewDataPoint(String time, int projectRequests, int schemaRequests) {
        this.time = time;
        this.projectRequests = projectRequests;
        this.schemaRequests = schemaRequests;
    }

}
