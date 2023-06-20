package com.vpr33.videolibrary.controller;


import com.vpr33.videolibrary.error.VideoNotFound;
import com.vpr33.videolibrary.model.genre.Genre;
import com.vpr33.videolibrary.model.genre.PreviewGenreMapper;
import com.vpr33.videolibrary.model.video.*;
import com.vpr33.videolibrary.service.VideoService;
import jakarta.servlet.http.PushBuilder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Stream;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/video")
public class VideoController {
    private final VideoService videoService;
    private final PreviewVideoMapper previewVideoMapper;
    private final DetailedVideoMapper detailedVideoMapper;

    @GetMapping
    Stream<PreviewVideo> getVideos(@RequestParam(required = false) List<Video.Type> type, @RequestParam(required = false) List<Genre> genre, @RequestParam(required = false) List<Long> rating, PushBuilder pushBuilder) {
        final List<Video> videos;
        if (type == null && genre == null && rating == null) videos = videoService.getAll();
        else videos = videoService.getFiltered(type, genre, rating);
        if (pushBuilder != null) videos.forEach(video -> pushBuilder.path("/image/" + video.getImage()).push());
        else log.info("pushBuilder is null");
        return videos.stream().map(previewVideoMapper);
    }

    @GetMapping("/{id}")
    DetailedVideo getVideo(@PathVariable Long id, PushBuilder pushBuilder) throws VideoNotFound {
        final var video = videoService.getOne(id);
        if(pushBuilder != null)
            pushBuilder.path("/image/" + video.getImage()).push();
        return detailedVideoMapper.apply(video);
    }

    @PreAuthorize("hasRole('MODERATOR')")
    @PostMapping
    @PutMapping
    Long addOrUpdateVideo(@RequestBody Video video) {
        return videoService.addOrUpdate(video);
    }

    @PreAuthorize("hasRole('MODERATOR')")
    @DeleteMapping("/{id}")
    void deleteVideo(@PathVariable Long id) {
        videoService.delete(id);
    }
}
