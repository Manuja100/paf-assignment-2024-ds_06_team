package com.ds_06.backend.service;


import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ds_06.backend.model.Comments;
import com.ds_06.backend.repository.CommentRepository;


@Service
public class CommentsService {

    @Autowired
    private CommentRepository repository;

    // CREATE
    public Comments addComment(Comments comment) {
        comment.setPostId(UUID.randomUUID().toString().split("-")[0]); // Assuming postId is generated similarly to taskId
        return repository.save(comment);
    }

    // READ
    public List<Comments> findAllComments() {
        return repository.findAll();
    }

    public Comments getCommentByCommentId(String commentId) {
        return repository.findById(commentId).orElse(null);
    }

    // UPDATE
    public Comments updateComment(Comments commentRequest) {
        Comments existingComment = repository.findById(commentRequest.getPostId()).orElse(null);
        if (existingComment != null) {
            existingComment.setDescription(commentRequest.getDescription());
            existingComment.setSeverity(commentRequest.getSeverity());
            existingComment.setUserId(commentRequest.getUserId());
            // Set other fields as needed
            return repository.save(existingComment);
        }
        return null; // Handle case when the comment to update doesn't exist
    }

    // DELETE
    public String deleteComment(String commentId) {
        Comments deletedComment = repository.findById(commentId).orElse(null);
        if (deletedComment != null) {
            repository.deleteById(commentId);
            return "Comment with ID: " + commentId + " deleted!";
        } else {
            return "Comment with ID: " + commentId + " not found!";
        }
    }
}