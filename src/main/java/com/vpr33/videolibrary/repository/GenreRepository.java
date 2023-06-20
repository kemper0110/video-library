package com.vpr33.videolibrary.repository;

import com.vpr33.videolibrary.model.genre.Genre;
import com.vpr33.videolibrary.model.video.Video;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface GenreRepository extends JpaRepository<Genre, Long> {
    List<Genre> findAllByVideos(Video video);
    List<Genre> findAllByNameIn(Collection<String> names);
}
