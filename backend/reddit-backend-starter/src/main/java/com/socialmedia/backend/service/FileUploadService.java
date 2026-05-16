package com.socialmedia.backend.service;

import org.springframework.stereotype.Service;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;

import java.io.IOException;

import java.nio.file.Files;

import java.nio.file.Path;

import java.nio.file.Paths;

import java.nio.file.StandardCopyOption;

import java.util.UUID;

@Service

public class FileUploadService {

    /* Upload Directory */

    private static final String
            UPLOAD_DIR = "uploads/";

    /* Upload File */

    public String uploadFile(

            MultipartFile file

    ) throws IOException {

        /* Validate File */

        if (

                file == null ||

                        file.isEmpty()

        ) {

            throw new RuntimeException(

                    "File is empty "

            );

        }

        /* Create Upload Folder */

        File uploadFolder =
                new File(UPLOAD_DIR);

        if (!uploadFolder.exists()) {

            boolean created =
                    uploadFolder.mkdirs();

            if (!created) {

                throw new RuntimeException(

                        "Failed to create uploads folder "

                );

            }

        }

        /* Original File Name */

        String originalFileName =

                file.getOriginalFilename();

        /* File Extension */

        String extension = "";

        if (

                originalFileName != null &&

                        originalFileName.contains(".")

        ) {

            extension =

                    originalFileName.substring(

                            originalFileName.lastIndexOf(".")

                    );

        }

        /* Generate Unique File Name */

        String fileName =

                UUID.randomUUID()

                        .toString()

                        + extension;

        /* Absolute File Path */

        Path uploadPath =

                Paths.get(

                        UPLOAD_DIR

                ).toAbsolutePath();

        /* Create Path */

        if (

                !Files.exists(uploadPath)

        ) {

            Files.createDirectories(
                    uploadPath
            );

        }

        /* Final File Path */

        Path filePath =

                uploadPath.resolve(
                        fileName
                );

        /* Save File */

        Files.copy(

                file.getInputStream(),

                filePath,

                StandardCopyOption.REPLACE_EXISTING

        );

        /* Return Public URL */

        return

                "http://localhost:8080/uploads/"

                        + fileName;

    }

}