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

    /* =========================================
       UPLOAD DIRECTORY
    ========================================= */

    private static final String
            UPLOAD_DIR = "uploads";

    /* =========================================
       BACKEND URL
    ========================================= */

    private static final String
            BASE_URL =
            "https://socialreddit-backend.onrender.com";

    /* =========================================
       UPLOAD FILE
    ========================================= */

    public String uploadFile(

            MultipartFile file

    ) throws IOException {

        /* =========================================
           VALIDATE FILE
        ========================================= */

        if (

                file == null ||

                        file.isEmpty()

        ) {

            throw new RuntimeException(

                    "File is empty"

            );

        }

        /* =========================================
           CREATE UPLOAD DIRECTORY
        ========================================= */

        Path uploadPath =

                Paths.get(
                        UPLOAD_DIR
                ).toAbsolutePath();

        if (

                !Files.exists(uploadPath)

        ) {

            Files.createDirectories(
                    uploadPath
            );

        }

        /* =========================================
           ORIGINAL FILE NAME
        ========================================= */

        String originalFileName =

                file.getOriginalFilename();

        /* =========================================
           FILE EXTENSION
        ========================================= */

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

        /* =========================================
           UNIQUE FILE NAME
        ========================================= */

        String fileName =

                UUID.randomUUID()

                        .toString()

                        + extension;

        /* =========================================
           FINAL FILE PATH
        ========================================= */

        Path filePath =

                uploadPath.resolve(
                        fileName
                );

        /* =========================================
           SAVE FILE
        ========================================= */

        Files.copy(

                file.getInputStream(),

                filePath,

                StandardCopyOption.REPLACE_EXISTING

        );

        /* =========================================
           RETURN PUBLIC IMAGE URL
        ========================================= */

        return

                BASE_URL +

                        "/uploads/" +

                        fileName;

    }

}