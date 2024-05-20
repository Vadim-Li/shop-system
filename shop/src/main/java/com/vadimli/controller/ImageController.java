package com.vadimli.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/image")
public class ImageController {

    @GetMapping("/{imageName}")
    public ResponseEntity<Resource> getImage(@PathVariable String imageName) {
        Resource resource = new ClassPathResource("static/img/" + imageName);

        if (resource.exists()) {
            return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(resource);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 指定上传文件的存储路径，根据实际情况修改
    private static final String UPLOAD_FOLDER = "src/main/resources/static/img/";

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @PostMapping("/upload")
    @ResponseBody
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("请选择要上传的文件");
        }

        try {
            // 获取文件的字节数组
            byte[] bytes = file.getBytes();

            // 构建文件路径
            Path path = Paths.get(UPLOAD_FOLDER + file.getOriginalFilename());

            // 创建文件夹（如果不存在）
            Files.createDirectories(path.getParent());

            // 将文件写入磁盘
            Files.write(path, bytes);

            messagingTemplate.convertAndSend("/topic/imageUploaded", "New image uploaded!");

            return ResponseEntity.ok("文件上传成功");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("文件上传失败");
        }
    }
}

