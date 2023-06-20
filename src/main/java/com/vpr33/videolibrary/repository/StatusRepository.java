package com.vpr33.videolibrary.repository;

import com.vpr33.videolibrary.model.Status;
import com.vpr33.videolibrary.model.user.User;
import com.vpr33.videolibrary.model.video.Video;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StatusRepository extends JpaRepository<Status, Long> {
    List<Status> findAllByUser(User user);
    void removeByVideoAndUser(Video video, User user);
    Optional<Status> findByVideoAndUser(Video video, User user);
}
