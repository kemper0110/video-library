package com.vpr33.videolibrary.service;

import com.vpr33.videolibrary.error.VideoNotFound;
import com.vpr33.videolibrary.model.Comment;
import com.vpr33.videolibrary.repository.CommentRepository;
import com.vpr33.videolibrary.model.user.User;
import com.vpr33.videolibrary.repository.VideoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
public class CommentService {
    private final CommentRepository commentRepository;
    private final VideoRepository videoRepository;

    public List<Comment> getAllVideoComments(Long video_id) {
        final var video = videoRepository.getReferenceById(video_id);
        return commentRepository.getCommentsByVideo(video);
    }

    public Comment addComment(Long video_id, User user, String text) throws VideoNotFound {
        final var video = videoRepository.findById(video_id).orElseThrow(() -> new VideoNotFound(video_id));
        final var comment = new Comment(video, user, new Date(), text);
        return commentRepository.save(comment);
    }
}
