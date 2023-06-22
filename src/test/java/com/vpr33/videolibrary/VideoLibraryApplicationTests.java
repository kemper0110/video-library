package com.vpr33.videolibrary;

import com.vpr33.videolibrary.model.video.Video;
import com.vpr33.videolibrary.repository.GenreRepository;
import com.vpr33.videolibrary.repository.VideoRepository;
import com.vpr33.videolibrary.service.VideoService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static java.util.List.of;

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

//        final var genreNames = List.of(
//                "Драма",
//                "Комедия"
//        );
//        final var types = List.of(
//                Video.Type.valueOf("movie"),
//                Video.Type.valueOf("clip"),
//                Video.Type.valueOf("season")
//        );
        final var genres = List.of(1L, 2L, 3L, 4L);
        final var videos = videoRepository.findVideosFiltered(
                List.of(Video.Type.season, Video.Type.movie),
                genres, 9D);
        System.out.println(videos.size());
    }

}
