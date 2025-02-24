package com.lucasramalho.rag.service;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;

@Service
public class FileService {
    @Autowired
    private ObjectStorageService objectStorageService;

    public void processFile(String filePath, String filename) {
        File file = new File(filePath);
        if(!file.exists()) {
            throw new RuntimeException();
        }

        String fileContent = this.extractTextFromPDF(file);

        if(fileContent == null) {
            throw new RuntimeException();
        }

        this.objectStorageService.upload("docs", filename, filePath);
        file.delete();
    }

    public String extractTextFromPDF(File file) {
        try (PDDocument document = PDDocument.load(file)) {
            PDFTextStripper pdfStripper = new PDFTextStripper();
            System.out.println(pdfStripper.getText(document));

            return pdfStripper.getText(document);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
