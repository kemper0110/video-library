package com.vpr33.videolibrary.model.studio;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vpr33.videolibrary.model.video.Video;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Set;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Table(name = "studio")
public class Studio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;

    @JsonIgnore
    @OneToMany(mappedBy = "studio", cascade = CascadeType.REMOVE)
    private Set<Video> videos;
}
