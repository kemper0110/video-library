package com.vpr33.videolibrary.model.genre;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vpr33.videolibrary.model.video.Video;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter@Setter@NoArgsConstructor@AllArgsConstructor
@Table(name = "genre")
public class Genre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    private String description;

    @JsonIgnore
    @ManyToMany(mappedBy = "genres")
    private Set<Video> videos = new HashSet<>();
}
