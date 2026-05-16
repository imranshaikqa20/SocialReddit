package com.socialmedia.backend.config;

import org.springframework.context.annotation.Configuration;

import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;

import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;

import java.nio.file.Paths;

@Configuration

public class WebConfig
        implements WebMvcConfigurer {

    @Override

    public void addResourceHandlers(

            ResourceHandlerRegistry registry

    ) {

        /* Absolute Upload Path */

        Path uploadDir =

                Paths.get("uploads");

        String uploadPath =

                uploadDir.toFile()

                        .getAbsolutePath();

        System.out.println(
                "UPLOAD PATH => "
                        + uploadPath
        );

        registry.addResourceHandler(

                        "/uploads/**"

                )

                .addResourceLocations(

                        "file:" +

                                uploadPath +

                                "/"

                );

    }

}