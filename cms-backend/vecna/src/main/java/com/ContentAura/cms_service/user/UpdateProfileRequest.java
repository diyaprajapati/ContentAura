package com.ContentAura.cms_service.user;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class UpdateProfileRequest {
    private String firstname;
    private String lastname;
    private String email;
}
