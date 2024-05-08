package com.ds_06.backend.service;

import java.io.FileNotFoundException;
// import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;

import org.bson.Document;
import org.bson.types.ObjectId;

import com.ds_06.backend.model.Video;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.GridFSDownloadStream;
import com.mongodb.client.gridfs.GridFSUploadStream;
import com.mongodb.client.gridfs.model.GridFSFile;
import com.mongodb.client.gridfs.model.GridFSUploadOptions;


import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.data.mongodb.core.query.Query;
// import javax.servlet.http.HttpServletResponse;
import java.util.Date; // Import Date class
    



@Service
public class VideoService {

    @Autowired
    private GridFSBucket gridFSBucket;
    @Autowired
    private GridFsTemplate gridFsTemplate;

    public String uploadVideo(String name, InputStream inputStream) throws IOException {
        ObjectId fileId;
        try {
            // Create metadata for the video file
            Document metaData = new Document();
            metaData.put("name", name);

            // Open a GridFS upload stream
            GridFSUploadStream uploadStream = gridFSBucket.openUploadStream(name, new GridFSUploadOptions().metadata(metaData));

            // Write the input stream to the GridFS upload stream
            byte[] buffer = new byte[1024 * 1024]; // 1MB buffer
            int bytesRead;
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                uploadStream.write(buffer, 0, bytesRead);
            }

            // Close the upload stream
            uploadStream.close();

            // Get the file ID
            fileId = uploadStream.getObjectId();
        } finally {
            // Close the input stream
            inputStream.close();
        }

        return fileId.toHexString();
    }

   
    
    
    public void getVideoBytesById(String id, HttpServletResponse response) throws IOException {
    // Retrieve the GridFS file by ID
    GridFSFile file = gridFSBucket.find(new Document("_id", new ObjectId(id))).first();
    if (file != null) {
        // Set content type header
        response.setContentType("video/mp4"); // Adjust the content type based on your video format
        // Open a download stream for the video file
        GridFSDownloadStream downloadStream = gridFSBucket.openDownloadStream(file.getObjectId());
        // Get the output stream from the response
        ServletOutputStream outputStream = response.getOutputStream();
        // Copy the data from the download stream to the response output stream
        int readBytes;
        byte[] buffer = new byte[1024];
        while ((readBytes = downloadStream.read(buffer)) != -1) {
            outputStream.write(buffer, 0, readBytes);
        }

        // Close the streams
        downloadStream.close();
        outputStream.close();
    } else {
        response.setStatus(HttpServletResponse.SC_NOT_FOUND);
    }
}

public List<Video> getAllVideos() {
    List<Video> allVideos = new ArrayList<>();

    try {
        // Retrieve all video files from the GridFS bucket
        MongoCursor<GridFSFile> cursor = gridFsTemplate.find(new Query()).iterator();
        while (cursor.hasNext()) {
            GridFSFile file = cursor.next();
            Video video = new Video();
            video.setId(file.getObjectId().toHexString());
            video.setName((String) file.getMetadata().get("name"));
            video.setUploadedDate(file.getUploadDate());
            video.setModifiedDate(file.getMetadata().getDate("uploadDate"));

            // Add the Video object to the list
            allVideos.add(video);
        }
    } catch (Exception e) {
        // Handle exception
        e.printStackTrace();
    }

    return allVideos;
}

public void updateVideo(String id, String name, InputStream newInputStream) throws IOException {
    try {
        // Find the existing video file by ID
        ObjectId objectId = new ObjectId(id);
        GridFSFile existingFile = gridFSBucket.find(new Document("_id", objectId)).first();
        if (existingFile == null) {
            throw new FileNotFoundException("Video with ID " + id + " not found");
        }

        // Extract the name from metadata
        String fileName = existingFile.getMetadata().getString("name");

        // Update metadata directly
        Document metadata = existingFile.getMetadata();
        metadata.put("modifiedDate", new Date()); // Automatically update modified date
        metadata.put("name", name); // Update the name in metadata

        // Open a new GridFS upload stream with the existing file's name and updated metadata
        GridFSUploadStream uploadStream = gridFSBucket.openUploadStream(fileName, new GridFSUploadOptions().metadata(metadata));

        // Write the new file content to the upload stream
        byte[] buffer = new byte[1024 * 1024]; // 1MB buffer
        int bytesRead;
        while ((bytesRead = newInputStream.read(buffer)) != -1) {
            uploadStream.write(buffer, 0, bytesRead);
        }

        // Close the upload stream
        uploadStream.close();
        
        // Delete the previous file
        gridFSBucket.delete(objectId);
    } finally {
        // Close the input stream
        if (newInputStream != null) {
            newInputStream.close();
        }
    }
}
    


    public void deleteVideo(String id) {
        gridFSBucket.delete(new ObjectId(id));
    }


}

