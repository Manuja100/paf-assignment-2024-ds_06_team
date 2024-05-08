package com.ds_06.backend.controller;


import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import java.util.List;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ds_06.backend.model.Video;
import com.ds_06.backend.service.VideoService;
import com.mongodb.client.gridfs.GridFSBucket;
// import com.mongodb.client.gridfs.GridFSDownloadStream;
import com.mongodb.client.gridfs.model.GridFSFile;


// import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/videos")
public class VideoController {

    @Autowired
    private VideoService videoService;

    @Autowired
    private GridFSBucket gridFSBucket;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadVideo(@RequestParam("name") String name, @RequestParam("file") MultipartFile file) {
        try {
            InputStream inputStream = file.getInputStream();
            String videoId = videoService.uploadVideo(name, inputStream);
            return ResponseEntity.ok("Video uploaded successfully with ID: " + videoId);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload video");
        }
    }

//     @GetMapping("/{id}")
// public void getVideoById(@PathVariable("id") String id, HttpServletResponse response) throws IOException {
//     // Retrieve the GridFS file by ID
//     GridFSFile file = gridFSBucket.find(new Document("_id", new ObjectId(id))).first();
//     if (file != null) {
//         // Set content type header
//         response.setContentType("video/mp4"); // Adjust the content type based on your video format
//         // Open a download stream for the video file
//         GridFSDownloadStream downloadStream = gridFSBucket.openDownloadStream(file.getObjectId());
//         // Get the output stream from the response
//         ServletOutputStream outputStream = response.getOutputStream();
//         // Copy the data from the download stream to the response output stream
//         int readBytes;
//         byte[] buffer = new byte[1024];
//         while ((readBytes = downloadStream.read(buffer)) != -1) {
//             outputStream.write(buffer, 0, readBytes);
//         }

//         // Close the streams
//         downloadStream.close();
//         outputStream.close();
//     } else {
//         response.setStatus(HttpServletResponse.SC_NOT_FOUND);
//     }
// }



@GetMapping("/{id}")
    public void getVideoById(@PathVariable("id") String id, HttpServletResponse response) throws IOException {
        // Retrieve the GridFS file by ID
        GridFSFile file = gridFSBucket.find(new Document("_id", new ObjectId(id))).first();
        if (file != null) {
            // Set content type header
            response.setContentType("application/json");

            // Prepare JSON response
            String jsonResponse = "{"
                    + "\"filename\": \"" + file.getFilename() + "\","
                    + "\"length\": " + file.getLength() + ","
                    + "\"uploadDate\": \"" + file.getUploadDate() + "\","
                    + "\"contentType\": \"" + file.getMetadata().getString("contentType") + "\","
                    + "\"metadata\": " + file.getMetadata().toJson()
                    + "}";

            // Write JSON response to the output stream
            response.getWriter().write(jsonResponse);
        } else {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
        }
    }
    
    @GetMapping("/all")
    public List<Video> getAllVideos() {
        return videoService.getAllVideos();
    }
    
   @PutMapping("/{id}")
public ResponseEntity<String> updateVideo(@PathVariable("id") String id, @RequestParam("name") String name, @RequestParam("file") MultipartFile file) {
    try {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File is empty");
        }

        try (InputStream inputStream = file.getInputStream()) {
            videoService.updateVideo(id, name, inputStream);
            return ResponseEntity.ok("Video updated successfully");
        }
    } catch (FileNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Video with ID " + id + " not found");
    } catch (IOException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to read or update video");
    }
}

    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteVideo(@PathVariable("id") String id) {
        videoService.deleteVideo(id);
        return ResponseEntity.ok("Video deleted successfully");
    }
}

