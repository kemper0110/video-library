package com.vpr33.videolibrary.controller;

import com.vpr33.videolibrary.error.UserNotFound;
import com.vpr33.videolibrary.error.VideoNotFound;
import com.vpr33.videolibrary.model.Comment;
import com.vpr33.videolibrary.service.CommentService;
import com.vpr33.videolibrary.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/comment")
public class CommentController {
    final CommentService commentService;
    private final UserService userService;
//    @PreAuthorize("isAuthenticated()") // -> creates problems (controller disappears)
    @PostMapping
    private Comment addComment(
            Authentication authentication,
            @RequestParam Long video_id,
            @RequestParam String text
            ) throws UserNotFound, VideoNotFound {
        final var user = userService.getUserByAuthentication(authentication);
        return commentService.addComment(video_id, user, text);
    }

    @GetMapping("/all")
    private List<Comment> getAllVideoComments(@RequestParam Long video_id) {
        return commentService.getAllVideoComments(video_id);
    }

    // test
    @GetMapping("/date")
    private Date getDate(){
        return new Date();
    }

}
