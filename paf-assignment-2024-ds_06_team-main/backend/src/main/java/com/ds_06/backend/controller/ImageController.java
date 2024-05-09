package com.ds_06.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.ds_06.backend.model.Image;
import com.ds_06.backend.model.WorkoutPlan;
import com.ds_06.backend.service.ImageService;

import java.io.IOException;
import java.util.Base64;
// import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/images")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("description") String description,
            @RequestParam("file") MultipartFile file, @RequestParam("userID") String userID,
            @RequestParam("username") String username) {
        try {
            imageService.uploadImage(description, file, userID, username);
            return ResponseEntity.status(HttpStatus.OK).body("Image uploaded successfully.");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading image.");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable("id") String id) {
        Optional<Image> optionalImage = imageService.getImageById(id);
        if (optionalImage.isPresent()) {
            Image image = optionalImage.get();
            return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(image.getData());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Image>> getAllImages() {
        List<Image> images = imageService.getAllImages(Sort.by(Sort.Direction.DESC, "createdAt"));
        if (!images.isEmpty()) {
            return ResponseEntity.ok(images);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // @GetMapping("/imageByUser/{userID}")
    // public ResponseEntity<Optional<List<Image>>> getImageByUserId(@PathVariable
    // String userID){
    // return new
    // ResponseEntity<Optional<List<Image>>>(imageService.findImageByUserID(userID),HttpStatus.OK);
    // }

    @GetMapping("/imageByUser/{username}")
    public ResponseEntity<Optional<List<Image>>> getImageByUserName(@PathVariable String username) {
        return new ResponseEntity<Optional<List<Image>>>(imageService.findImageByUserName(username), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateImage(@PathVariable("id") String id, @RequestBody Image description) {
        try {
            imageService.updateImageName(id, description.getDescription()); // Assuming a method to update image
                                                                            // description
            return ResponseEntity.ok().body("Image description updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating image description.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteImage(@PathVariable("id") String id) {
        try {
            imageService.deleteImage(id);
            return ResponseEntity.ok().body("Image deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting image.");
        }
    }

}
