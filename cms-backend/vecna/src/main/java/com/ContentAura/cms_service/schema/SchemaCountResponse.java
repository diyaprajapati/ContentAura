package com.ContentAura.cms_service.schema;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SchemaCountResponse {
    private String projectTitle;
    private int schemaCount;
}
