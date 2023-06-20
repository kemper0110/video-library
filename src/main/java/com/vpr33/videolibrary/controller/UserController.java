package com.vpr33.videolibrary.controller;


import com.vpr33.videolibrary.auth.UserDetailsX;
import com.vpr33.videolibrary.error.UserNotFound;
import com.vpr33.videolibrary.model.user.UserInfo;
import com.vpr33.videolibrary.model.user.UserInfoMapper;
import com.vpr33.videolibrary.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Stream;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserRepository userRepository;
    private final UserInfoMapper userInfoMapper;

    @PreAuthorize("isAuthenticated()")
    @GetMapping
    UserInfo getInfo(Authentication authentication){
        final var user = (UserDetailsX)authentication.getPrincipal();
        return new UserInfo(user.getId(), user.getUsername(), user.getRole());
    }

    @PreAuthorize("hasRole('MODERATOR')")
    @GetMapping("/all")
    Stream<UserInfo> getAllUsers() {
        return userRepository.findAll().stream().map(userInfoMapper);
    }

    @PreAuthorize("hasRole('MODERATOR')")
    @DeleteMapping("/{id}")
    void deleteUserById(@PathVariable Long id) throws UserNotFound {
        final var user = userRepository.findById(id).orElseThrow(UserNotFound::new);
        userRepository.delete(user);
    }
}
