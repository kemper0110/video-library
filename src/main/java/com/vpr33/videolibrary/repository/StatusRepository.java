package com.vpr33.videolibrary.repository;

import com.vpr33.videolibrary.model.status.Status;
import com.vpr33.videolibrary.model.user.User;
import com.vpr33.videolibrary.model.video.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StatusRepository extends JpaRepository<Status, Long> {
//    @Query("select s, s.video.name, s.video.episodes from Status s join fetch s.video where s.user.id = :user_id")
    @Query("select s, v from Status s join fetch s.video v where s.user.id = :user_id")
    List<Status> findAllByUserFetch(@Param("user_id") Long user_id);
    void removeByVideoIdAndUserId(Long video_id, Long user_id);
    @Query("select s from Status s where s.video.id = :video_id and s.user.id = :user_id")
    Optional<Status> findByVideoIdAndUserId(@Param("video_id") Long video_id, @Param("user_id") Long user_id);
}
