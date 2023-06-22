package com.vpr33.videolibrary.repository;

import com.vpr33.videolibrary.model.genre.Genre;
import com.vpr33.videolibrary.model.video.Video;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.Predicate;

import java.util.ArrayList;
import java.util.List;

public class VideoFilteredRepositoryImpl implements VideoFilteredRepository {
    @PersistenceContext
    private EntityManager em;

    @Override
    public List<Video> findVideosFiltered(List<Video.Type> types, List<Long> genres, Double minRating) {
        var cb = em.getCriteriaBuilder();
        var query = cb.createQuery(Video.class);
        var genre = query.from(Genre.class);

        var predicates = new ArrayList<Predicate>();
        if(types != null && !types.isEmpty())
            predicates.add(genre.get("videos").get("type").in(types));
        if(genres != null && !genres.isEmpty())
            predicates.add(genre.get("id").in(genres));
        if(minRating != null)
            predicates.add(cb.ge(genre.get("videos").get("rating"), minRating));

        query
                .distinct(true)
                .select(genre.get("videos"))
                .where(cb.and(predicates.toArray(new Predicate[0])))
        ;
        return em.createQuery(query).getResultList();
    }
}
