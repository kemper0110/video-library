package com.vpr33.videolibrary.controller;


import com.vpr33.videolibrary.error.StatusNotFound;
import com.vpr33.videolibrary.error.UserNotFound;
import com.vpr33.videolibrary.error.VideoNotFound;
import com.vpr33.videolibrary.model.Status;
import com.vpr33.videolibrary.service.StatusService;
import com.vpr33.videolibrary.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/status")
public class StatusController {

    final StatusService statusService;
    final UserService userService;


    @PreAuthorize("isAuthenticated()")
    @GetMapping("/all")
    List<Status> getAllStatus(Authentication authentication) throws UserNotFound {
        return statusService.getAll(userService.getUserByAuthentication(authentication));
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping
    Status getVideoStatus(Authentication authentication, @RequestParam Long video_id) throws UserNotFound, VideoNotFound, StatusNotFound {
        final var status = statusService.getOne(userService.getUserByAuthentication(authentication), video_id);
        log.info("video state = {}", status.getState());
        return status;
    }
    @PreAuthorize("isAuthenticated()")
    @DeleteMapping
    void deleteStatus(Authentication authentication, @RequestParam Long video_id) throws UserNotFound, VideoNotFound {
        statusService.delete(userService.getUserByAuthentication(authentication), video_id);
    }
    @PreAuthorize("isAuthenticated()")
    @PatchMapping
    void setState(Authentication authentication, @RequestParam Long video_id, @RequestParam Status.State state) throws UserNotFound, VideoNotFound {
        statusService.setState(userService.getUserByAuthentication(authentication), video_id, state);
    }
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/rating")
    void setRating(Authentication authentication, @RequestParam Long video_id, @RequestParam Double rating) throws UserNotFound, VideoNotFound, StatusNotFound {
        statusService.setRating(userService.getUserByAuthentication(authentication), video_id, rating);
    }
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/episode")
    void setEpisode(Authentication authentication, @RequestParam Long video_id, @RequestParam Integer episodes) throws UserNotFound, VideoNotFound, StatusNotFound {
        statusService.setEpisodes(userService.getUserByAuthentication(authentication), video_id, episodes);
    }
}
