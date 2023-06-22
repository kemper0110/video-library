package com.vpr33.videolibrary.model.comment;

import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class PreviewCommentMapper implements Function<Comment, PreviewComment> {
    @Override
    public PreviewComment apply(Comment comment) {
        return new PreviewComment(comment.getDate(), comment.getText(),
                comment.getUser().getUsername());
    }
}
