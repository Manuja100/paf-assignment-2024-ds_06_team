package com.ds_06.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.ds_06.backend.model.Comments;
import com.ds_06.backend.service.CommentsService;



@RestController
@RequestMapping("/comments")
public class CommentsController {

    @Autowired
    private CommentsService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Comments createComment(@RequestBody Comments comment) {
        return service.addComment(comment);
    }

    @GetMapping
    public List<Comments> getComments() {
        return service.findAllComments();
    }

    @GetMapping("/{commentId}")
    public Comments getComment(@PathVariable String commentId) {
        return service.getCommentByCommentId(commentId);
    }

    @PutMapping
    public Comments modifyComment(@RequestBody Comments comment) {
        return service.updateComment(comment);
    }

    @DeleteMapping("/{commentId}")
    public String deleteComment(@PathVariable String commentId) {
        return service.deleteComment(commentId);
    }

    
}
