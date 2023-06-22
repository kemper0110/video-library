package com.vpr33.videolibrary.model.video;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vpr33.videolibrary.model.*;
import com.vpr33.videolibrary.model.comment.Comment;
import com.vpr33.videolibrary.model.genre.Genre;
import com.vpr33.videolibrary.model.status.Status;
import com.vpr33.videolibrary.model.studio.Studio;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;


@Entity
@Getter@Setter@NoArgsConstructor@AllArgsConstructor
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@Table(name = "video")
public class Video {
    public enum Type{
        movie, season, clip
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Type type;

    @Column(nullable = false)
    private String name;

    @Column(length = 3000)
    private String description;

    @Column(nullable = false)
    private Double rating;

    private String image;
    private Long episodes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "studio_id")
    private Studio studio;

    @ManyToMany
    @JoinTable(name = "video_to_genre",
            joinColumns = @JoinColumn(name = "video_id"),
            inverseJoinColumns = @JoinColumn(name = "genre_id")
    )
    private Set<Genre> genres;

    @JsonIgnore
    @OneToMany(mappedBy = "video", cascade = CascadeType.ALL)
    private Set<Content> contents;

    @JsonIgnore
    @OneToMany(mappedBy = "video", cascade = CascadeType.ALL)
    private Set<Comment> comments;

    @JsonIgnore
    @OneToMany(mappedBy = "video", cascade = CascadeType.ALL)
    private Set<Status> status;
}
