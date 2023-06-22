package com.vpr33.videolibrary.repository;

import com.vpr33.videolibrary.model.video.Video;

import java.util.List;

public interface VideoFilteredRepository {
    List<Video> findVideosFiltered(List<Video.Type> types, List<Long> genres, Double minRating);


}
