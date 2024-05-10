package com.ds_06.backend.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ds_06.backend.model.Image;
import com.ds_06.backend.repository.ImageRepository;


import java.io.IOException;
// import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Base64;
import java.util.Date; // Import Date class
// import java.util.List;
// import java.util.Optional;

@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

    
    public void uploadImage(String description, MultipartFile file, String userID, String username) throws IOException {
        Image image = new Image();
        image.setDescription(description);
        image.setData(file.getBytes());
        Date currentDate = new Date(); // Create a new Date object for the current date and time
        image.setCreatedAt(currentDate);
        image.setLastModifiedAt(currentDate);
        image.setUserID(userID);
        image.setUsername(username);
        imageRepository.save(image);

    }


    public List<Image> getAllImages(Sort sort) {
        return imageRepository.findAll(sort);
}

    // public Optional<List<Image>> findImageByUserID(String userID){
    //     return imageRepository.findImageByUserID(userID);
    // }

    // public Optional<List<Image>> findImageByUserID(String userID){
    //     return imageRepository.findImageByUserID(userID);
    // }

    public Optional<List<Image>> findImageByUserName(String username){
        return imageRepository.findImageByUsername(username);
    }


    public void updateImageName(String id, String description) {
        Optional<Image> optionalImage = imageRepository.findById(id);
        if (optionalImage.isPresent()) {
            Image image = optionalImage.get();
            image.setDescription(description);
            image.setLastModifiedAt(new Date()); // Set last modified date to current date and time
            imageRepository.save(image);
        }
    }

    public Optional<Image> getImageById(String id) {
        return imageRepository.findById(id);
    }

    public void deleteImage(String id) {
        imageRepository.deleteById(id);
    }


}

