package com.vpr33.videolibrary.model;


import com.vpr33.videolibrary.model.video.Video;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Entity
@Getter@Setter@NoArgsConstructor@AllArgsConstructor
@IdClass(Content.ContentId.class)
@Table(name = "content")
public class Content {

    @RequiredArgsConstructor
    @EqualsAndHashCode
    public static class ContentId implements Serializable {
        private Long episode;
        private Long video;
    }

    @Id
    @Column(nullable = false)
    private Long episode;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String file;

    @Id
    @ManyToOne(optional = false)
    @JoinColumn(name = "video_id", nullable = false)
    private Video video;
}
