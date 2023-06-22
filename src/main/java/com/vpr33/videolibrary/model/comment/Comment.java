package com.vpr33.videolibrary.model.comment;

import com.vpr33.videolibrary.model.user.User;
import com.vpr33.videolibrary.model.video.Video;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Date;

@Entity
@IdClass(Comment.CommentId.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "comment")
public class Comment {

    @RequiredArgsConstructor
    @EqualsAndHashCode
    public static class CommentId implements Serializable {
        private Long user;
        private Long video;
        private Date date;
    }

    @Id
    @ManyToOne(optional = false)
    @JoinColumn(name = "video_id", nullable = false)
    private Video video;
    @Id
    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    @Id
    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;
    @Column(nullable = false)
    private String text;
}
