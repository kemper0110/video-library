package com.vpr33.videolibrary.model.status;


import com.vpr33.videolibrary.model.user.User;
import com.vpr33.videolibrary.model.video.Video;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@IdClass(Status.StatusId.class)
@Table(name = "status")
public class Status {
    @RequiredArgsConstructor
    @EqualsAndHashCode
    public static class StatusId implements Serializable {
        private Long user;
        private Long video;
    }
    public enum State {
        PLANNED, WATCHING, WATCHED, ABANDONED
    }
    public Status(Video video, User user){
        this.video = video;
        this.user = user;
        this.rating = null;
        this.episodes = 0;
        this.state = State.PLANNED;
    }
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "video_id", nullable = false)
    private Video video;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private Double rating;

    private Integer episodes;

    @Enumerated(EnumType.STRING)
    private State state;
}
