package com.vpr33.videolibrary.repository;

import com.vpr33.videolibrary.model.Comment;
import com.vpr33.videolibrary.model.video.Video;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Comment.CommentId> {
    List<Comment> getCommentsByVideo(Video video);
}