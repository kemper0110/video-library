package com.vpr33.videolibrary.repository;

import com.vpr33.videolibrary.model.genre.Genre;
import com.vpr33.videolibrary.model.video.Video;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VideoRepository extends
        JpaRepository<Video, Long>,
        JpaSpecificationExecutor<Video>,
        VideoFilteredRepository {
    @Query("select v from Video v join fetch v.studio join fetch v.genres where v.id = :video_id")
    Optional<Video> findByIdFetchInfo(@Param("video_id") Long video_id);
}
