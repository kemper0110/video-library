package com.vpr33.videolibrary.controller;

import com.vpr33.videolibrary.error.UserNotFound;
import com.vpr33.videolibrary.model.comment.Comment;
import com.vpr33.videolibrary.model.comment.PreviewComment;
import com.vpr33.videolibrary.model.comment.PreviewCommentMapper;
import com.vpr33.videolibrary.service.CommentService;
import com.vpr33.videolibrary.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.stream.Stream;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/comment")
public class CommentsController {
    private final CommentService commentService;
    private final UserService userService;
    private final PreviewCommentMapper previewCommentMapper;

//    @PreAuthorize("isAuthenticated()") // -> creates problems (services disappear)
    @PostMapping
    private PreviewComment addComment(
            Authentication authentication,
            @RequestParam Long video_id,
            @RequestParam String text
    ) throws UserNotFound {
        final var user = userService.getUserByAuthentication(authentication);
        return previewCommentMapper.apply(commentService.addComment(video_id, user, text));
    }

    @GetMapping("/all")
    private Stream<PreviewComment> getAllVideoComments(@RequestParam Long video_id) {
        return commentService.getAllVideoComments(video_id)
                .stream().map(previewCommentMapper);
    }

    // test
    @GetMapping("/date")
    private String getDate(Authentication authentication) throws UserNotFound {
        final var user = userService.getUserByAuthentication(authentication);
        return (new Date() + " " + user.getUsername());
    }
}
