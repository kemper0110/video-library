package com.vpr33.videolibrary.auth;

import com.vpr33.videolibrary.model.user.Right;
import com.vpr33.videolibrary.model.user.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;


@Component
@RequiredArgsConstructor
public class RoleProvider {
    @Value("#{'${rights.user}'.split(' ')}")
    private final List<String> userStringRights;
    @Value("#{'${rights.moderator}'.split(' ')}")
    private final List<String> moderatorStringRights;

    public List<Right> getRightsByRole(Role role){
        final var rights = switch (role){
            case ROLE_USER -> userStringRights;
            case ROLE_MODERATOR -> moderatorStringRights;
            case ROLE_UNAUTHORIZED -> null;
        };
        assert rights != null;
        return rights.stream().map(Right::new).toList();
    }
}

