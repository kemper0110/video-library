package com.vpr33.videolibrary.service;


import com.vpr33.videolibrary.error.VideoNotFound;
import com.vpr33.videolibrary.model.genre.Genre;
import com.vpr33.videolibrary.model.video.Video;
import com.vpr33.videolibrary.repository.VideoRepository;
import jakarta.persistence.criteria.Expression;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;


@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class VideoService {
    private final VideoRepository videoRepository;

    public List<Video> getFiltered(List<Video.Type> types, List<Long> genres, Double minRating) {
        return videoRepository.findVideosFiltered(types, genres, minRating);
    }

    public List<Video> getAll() {
        return videoRepository.findAll();
    }

    public Video getOne(Long id) throws VideoNotFound {
        return videoRepository.findByIdFetchInfo(id).orElseThrow(VideoNotFound::new);
    }

    public void addOrUpdate(Video video) {
        log.debug("video genres count: {}", video.getGenres().size());
        videoRepository.save(video);
    }

    public void delete(Long id) {
        videoRepository.deleteById(id);
    }

    public void setImagePath(Long video_id, String image_path) throws VideoNotFound {
        final var video = videoRepository.findById(video_id).orElseThrow(VideoNotFound::new);
        video.setImage(image_path);
        videoRepository.save(video);
    }



    /// legace part

    public List<Video> getFilteredLegacy(List<Video.Type> types, List<Genre> genres, List<Long> ratings) {
        var spec = all();
        if (types != null && !types.isEmpty()) spec = spec.and(filterType(types));
        if (genres != null && !genres.isEmpty()) spec = spec.and(filterGenre(genres));
        if (ratings != null && !ratings.isEmpty()) spec = spec.and(filterRating(ratings));
        return videoRepository.findAll(spec);
    }

    private Specification<Video> filterType(List<Video.Type> types) {
        if (types == null) return null;
        return Specification.anyOf(types.stream().map(this::withType).toList());
    }

    private Specification<Video> withType(Video.Type type) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("type"), type);
    }

    private Specification<Video> filterRating(List<Long> ratings) {
        if (ratings == null) return null;
        return Specification.anyOf(ratings.stream().map(this::withRatingGreater).toList());
    }

    private Specification<Video> filterGenre(List<Genre> genres) {
        if (genres == null) return null;
        return (root, query, criteriaBuilder) -> {
            final Expression<Set<Genre>> genres_root = root.get("genres");
            return genres.stream().reduce(criteriaBuilder.disjunction(), (pred, genre) -> criteriaBuilder.or(criteriaBuilder.isMember(genre, genres_root), pred), criteriaBuilder::or);
        };
    }

    private Specification<Video> withRatingGreater(Long rating) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.greaterThanOrEqualTo(root.get("rating"), rating);
    }

    private Specification<Video> all() {
        return (root, query, criteriaBuilder) -> criteriaBuilder.and();
    }

}
