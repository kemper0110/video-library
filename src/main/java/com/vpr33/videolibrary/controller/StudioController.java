package com.vpr33.videolibrary.controller;


import com.vpr33.videolibrary.model.studio.PreviewStudio;
import com.vpr33.videolibrary.model.studio.PreviewStudioMapper;
import com.vpr33.videolibrary.model.studio.Studio;
import com.vpr33.videolibrary.repository.StudioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Stream;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/studio")
public class StudioController {
    private final StudioRepository studioRepository;
    private final PreviewStudioMapper previewStudioMapper;

    @GetMapping
    Stream<PreviewStudio> getAllStudios(){
        return studioRepository.findAll().stream().map(previewStudioMapper);
    }
}
