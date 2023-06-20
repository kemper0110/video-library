package com.vpr33.videolibrary.auth;


import com.vpr33.videolibrary.model.user.Role;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

public class UserDetailsX extends User {
    @Getter
    final Role role;
    @Getter
    final Long id;
    public UserDetailsX(Long id, String username, String password, Collection<? extends GrantedAuthority> authorities, Role role) {
        super(username, password, authorities);
        this.role = role;
        this.id = id;
    }
}
