package com.vpr33.videolibrary.controller;


import com.vpr33.videolibrary.error.StatusNotFound;
import com.vpr33.videolibrary.error.UserNotFound;
import com.vpr33.videolibrary.error.VideoNotFound;
import com.vpr33.videolibrary.model.status.*;
import com.vpr33.videolibrary.service.StatusService;
import com.vpr33.videolibrary.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.stream.Stream;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/status")
public class StatusController {
    private final StatusService statusService;
    private final UserService userService;
    private final DetailedStatusMapper detailedStatusMapper;
    private final PreviewStatusMapper previewStatusMapper;

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/all")
    Stream<DetailedStatus> getAllStatus(Authentication authentication) throws UserNotFound {
        final var user_id = userService.getPrincipal(authentication).getId();
        return statusService.getAll(user_id)
                .stream().map(detailedStatusMapper);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping
    PreviewStatus getVideoStatus(Authentication authentication, @RequestParam Long video_id) throws StatusNotFound {
        final var status = previewStatusMapper.apply(
                statusService.getOne(userService.getPrincipal(authentication).getId(), video_id));
        return status;
    }

    @PreAuthorize("isAuthenticated()")
    @DeleteMapping
    void deleteStatus(Authentication authentication, @RequestParam Long video_id) throws UserNotFound, VideoNotFound {
        statusService.delete(userService.getUserByAuthentication(authentication).getId(), video_id);
    }

    @PreAuthorize("isAuthenticated()")
    @PatchMapping
    void setState(Authentication authentication, @RequestParam Long video_id, @RequestParam Status.State state) throws UserNotFound, VideoNotFound {
        statusService.setState(userService.getUserByAuthentication(authentication).getId(), video_id, state);
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/rating")
    void setRating(Authentication authentication, @RequestParam Long video_id, @RequestParam Double rating) throws UserNotFound, VideoNotFound, StatusNotFound {
        statusService.setRating(userService.getUserByAuthentication(authentication).getId(), video_id, rating);
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/episode")
    void setEpisode(Authentication authentication, @RequestParam Long video_id, @RequestParam Integer episodes) throws UserNotFound, VideoNotFound, StatusNotFound {
        statusService.setEpisodes(userService.getUserByAuthentication(authentication).getId(), video_id, episodes);
    }


    // test
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/date")
    private String getDate(Authentication authentication) throws UserNotFound {
        final var user = userService.getUserByAuthentication(authentication);
        return (new Date() + " " + user.getUsername());
    }
}
