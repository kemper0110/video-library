package com.vpr33.videolibrary;

import com.vpr33.videolibrary.model.video.Video;
import com.vpr33.videolibrary.repository.GenreRepository;
import com.vpr33.videolibrary.repository.VideoRepository;
import com.vpr33.videolibrary.service.VideoService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
//@RequiredArgsConstructor
class VideoLibraryApplicationTests {
    @Autowired
    private VideoService service;
    @Autowired
    private GenreRepository genreRepository;
    @Autowired
    private VideoRepository videoRepository;
    @Test
    void contextLoads() {
//        final var genre = genreRepository.findById(1L).get();
//        final var genres = List.of(genre);
//        final var videos = service.getFiltered(
//        ), null, null);
//        System.out.println(videos.size());

        final var names = List.of(
                "Драма",
                "Комедия"
        );
        final var types = List.of(
//                Video.Type.valueOf("movie"),
                Video.Type.valueOf("clip"),
                Video.Type.valueOf("season")
        );
        final var genres = genreRepository.findAllByNameIn(names);
        final var videos = service.getFiltered(types, genres, null);
        videos.size();
    }

}
