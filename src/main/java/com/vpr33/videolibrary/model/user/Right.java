package com.vpr33.videolibrary.model.user;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

@Data
public class Right implements GrantedAuthority{

    final private String name;

    @Override
    public String getAuthority() {
        return name;
    }
}
