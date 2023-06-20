package com.vpr33.videolibrary.controller;


import com.vpr33.videolibrary.error.VideoNotFound;
import com.vpr33.videolibrary.model.genre.Genre;
import com.vpr33.videolibrary.model.genre.PreviewGenre;
import com.vpr33.videolibrary.model.genre.PreviewGenreMapper;
import com.vpr33.videolibrary.service.GenreService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Stream;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/genre")
public class GenreController {
    private final GenreService genreService;
    private final PreviewGenreMapper previewGenreMapper;

    @GetMapping
    Stream<PreviewGenre> getAllGenres(@RequestParam(required = false) Long video_id) {
        if (video_id == null)
            return genreService.getAll().stream().map(previewGenreMapper);
        else
            return genreService.getByVideoId(video_id).stream().map(previewGenreMapper);
    }
}
