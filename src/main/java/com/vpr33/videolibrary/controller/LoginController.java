package com.vpr33.videolibrary.controller;


import com.vpr33.videolibrary.auth.JWTUtils;
import com.vpr33.videolibrary.auth.UserDetailsX;
import com.vpr33.videolibrary.error.PasswordException;
import com.vpr33.videolibrary.error.UserAlreadyExists;
import com.vpr33.videolibrary.error.UserNotFound;
import com.vpr33.videolibrary.model.user.UserInfo;
import com.vpr33.videolibrary.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.login.LoginException;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class LoginController {
    private final UserService userService;
    private final JWTUtils jwtUtils;
    @PostMapping("/registration")
    private UserInfo register(@RequestParam String username, @RequestParam String password) throws LoginException, UserNotFound, PasswordException, UserAlreadyExists {
        userService.save(username, password);
        return userService.findUserInfoByUsername(username);
    }
    @DeleteMapping("/logout")
    private void logout(HttpServletResponse response) {
        jwtUtils.getDeleteCookies().forEach(response::addCookie);
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(method = {RequestMethod.GET, RequestMethod.POST})
    UserInfo getInfo(Authentication authentication){
        log.debug("auth triggered");
        final var user = (UserDetailsX)authentication.getPrincipal();
        return new UserInfo(user.getId(), user.getUsername(), user.getRole());
    }
}
