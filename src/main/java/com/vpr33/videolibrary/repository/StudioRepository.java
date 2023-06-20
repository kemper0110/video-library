package com.vpr33.videolibrary.repository;

import com.vpr33.videolibrary.model.studio.Studio;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudioRepository extends JpaRepository<Studio, Long> {
}
