package com.vpr33.videolibrary.repository;

import com.vpr33.videolibrary.model.comment.Comment;
import com.vpr33.videolibrary.model.video.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Comment.CommentId> {
    @Query("select c from Comment c join fetch c.user where c.video.id = :video_id")
    List<Comment> getCommentsByVideoId(@Param("video_id") Long video_id);
}