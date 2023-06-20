package com.vpr33.videolibrary.service;


import com.vpr33.videolibrary.error.VideoNotFound;
import com.vpr33.videolibrary.model.genre.Genre;
import com.vpr33.videolibrary.repository.GenreRepository;
import com.vpr33.videolibrary.repository.VideoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class GenreService {
    final GenreRepository genreRepository;
    final VideoRepository videoRepository;

    public List<Genre> getAll() {
        return genreRepository.findAll();
    }

    public List<Genre> getByVideoId(Long video_id) {
        return genreRepository.findAllByVideos(videoRepository.getReferenceById(video_id));
    }
}
