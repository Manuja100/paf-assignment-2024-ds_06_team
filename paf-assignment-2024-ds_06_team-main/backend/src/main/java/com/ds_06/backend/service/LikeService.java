package com.ds_06.backend.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ds_06.backend.model.Likes;
import com.ds_06.backend.repository.LikeRepository;



@Service
public class LikeService {


    @Autowired
    private LikeRepository likeRepository;

    // Add Like
    public Likes addLike(Likes like) {
        
        like.setLikeId(UUID.randomUUID().toString());
        return likeRepository.save(like);
    }

    // Delete Like
    public String deleteLike(String likeId) {
        Likes deletedLike = likeRepository.findById(likeId).orElse(null);
        if (deletedLike != null) {
            likeRepository.deleteById(likeId);
            return "Like with ID: " + likeId + " deleted!";
        } else {
            return "Like with ID: " + likeId + " not found!";
        }
    }

    public List<Likes> getAllLikes() {
        return likeRepository.findAll();
    }

    public Likes getLikeById(String likeId) {
        return likeRepository.findById(likeId).orElse(null);
    }

    public List<Likes> getLikesByPostId(String postId) {
        return likeRepository.getLikesByPostId(postId);
    }

    public List<Likes> getLikesByUserId(String userId) {
        return likeRepository.getLikesByUserId(userId);
    }
}
