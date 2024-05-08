package com.ds_06.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.ds_06.backend.model.Likes;
import com.ds_06.backend.service.LikeService;



@RestController
@RequestMapping("/likes")
public class LikeController {

    @Autowired
    private LikeService likeService;

    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)

    public Likes addLike(@RequestBody Likes likes) {
        return likeService.addLike(likes);
    }

    @DeleteMapping("/{likeId}")
    public String deleteLike(@PathVariable String likeId) {
        return likeService.deleteLike(likeId);
    }

    // Additional endpoints can be added for retrieving likes, updating likes, etc.
}
