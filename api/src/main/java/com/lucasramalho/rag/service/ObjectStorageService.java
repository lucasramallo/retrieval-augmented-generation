package com.lucasramalho.rag.service;

import com.lucasramalho.rag.dto.FileInfoDTO;
import io.minio.ListObjectsArgs;
import io.minio.MinioClient;
import io.minio.Result;
import io.minio.UploadObjectArgs;
import io.minio.errors.*;
import io.minio.messages.Item;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

/**
 * Serviço responsável pelo gerenciamento de uploads de arquivos para um serviço de armazenamento baseado no MinIO.
 *
 * Utiliza a biblioteca MinIO para interagir com um servidor de armazenamento de objetos compatível com o S3.
 * O serviço configura um cliente MinIO com as credenciais fornecidas e permite o upload de arquivos para um
 * bucket especificado.
 *
 * @author João Lucas
 * @version 1.0
 */
@Service
public class ObjectStorageService {
    private final MinioClient minioClient;

    public ObjectStorageService(
            @Value("${minio.url}") String minioUrl,
            @Value("${minio.access-key}") String accessKey,
            @Value("${minio.secret-key}") String secretKey) {

        this.minioClient = MinioClient.builder()
                .endpoint(minioUrl)
                .credentials(accessKey, secretKey)
                .build();
    }

    public void upload(String bucketName, String objectName, String filePath) {
        try {
            this.minioClient.uploadObject(
                    UploadObjectArgs.builder()
                            .bucket(bucketName)
                            .object(objectName)
                            .filename(filePath)
                            .build());
            System.out.println(filePath + " is successfully uploaded as " + objectName + " to bucket " + bucketName);
        } catch (MinioException e) {
            System.out.println("Error occurred: " + e);
            System.out.println("HTTP trace: " + e.httpTrace());
        } catch (InvalidKeyException | NoSuchAlgorithmException | IOException e) {
            throw new RuntimeException(e);
        }
    }

    public List<FileInfoDTO> listFileInfos()  {
        List<FileInfoDTO> files = new ArrayList<>();

        Iterable<Result<Item>> results = this.minioClient.listObjects(
                ListObjectsArgs.builder().bucket("docs").recursive(true).build());

        for (Result<Item> result : results) {
            Item item = null;
            try {
                item = result.get();
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
            String objectName = item.objectName();
            String fileUrl = String.format("%s/%s/%s", "http://localhost:9000", "docs", objectName);

            files.add(new FileInfoDTO(objectName, fileUrl, "description generica ppor enquanto"));
        }

        return files;
    }
}
