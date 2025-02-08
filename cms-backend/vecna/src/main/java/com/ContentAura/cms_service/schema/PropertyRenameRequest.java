package com.ContentAura.cms_service.schema;

import lombok.Data;

@Data
public class PropertyRenameRequest {
    private String oldName;
    private String newName;
}
