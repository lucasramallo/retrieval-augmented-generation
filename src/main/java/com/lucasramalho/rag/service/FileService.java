package com.lucasramalho.rag.service;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;

@Service
public class FileService {
    public void extractTextFromPDF(String filePath) {
        File file = new File(filePath);

        try (PDDocument document = PDDocument.load(file)) {
            PDFTextStripper pdfStripper = new PDFTextStripper();
            System.out.println(pdfStripper.getText(document));
        } catch (IOException e) {
            e.printStackTrace();
            return;
        }

        // Após extração, deletar o arquivo
        if (file.delete()) {
            System.out.println("Arquivo deletado com sucesso: " + filePath);
        } else {
            System.err.println("Erro ao deletar o arquivo: " + filePath);
        }
    }
}
