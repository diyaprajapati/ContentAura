package com.ContentAura.cms_backend.schema;

import lombok.Data;

@Data
public class PropertyRenameRequest {
    private String oldName;
    private String newName;
}
