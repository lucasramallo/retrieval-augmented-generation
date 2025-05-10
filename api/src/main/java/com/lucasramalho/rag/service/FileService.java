package com.lucasramalho.rag.service;

import com.lucasramalho.rag.dto.FileInfoDTO;
import com.lucasramalho.rag.model.DocumentModel;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.File;
import java.io.IOException;
import java.util.List;

/**
 * Serviço responsável pelo processamento de arquivos PDF, extração de texto e upload para um serviço de armazenamento.
 *
 * A classe utiliza a biblioteca Apache PDFBox para extrair o conteúdo dos arquivos PDF e o serviço ObjectStorageService
 * para realizar o upload do arquivo para um armazenamento remoto.
 *
 * Após o processamento, o arquivo é deletado localmente para liberar espaço.
 *
 * @author João Lucas
 * @version 1.0
 */
@Service
@ConditionalOnProperty(name = "elasticsearch.enabled", havingValue = "true", matchIfMissing = false)
public class FileService {
    @Autowired
    private ObjectStorageService objectStorageService;

    @Autowired
    private ElasticService elasticService;

    private static final Logger LOGGER = LogManager.getLogger(FileService.class);

    public void processFile(String filePath, String filename) {
        File file = new File(filePath);

        if (!file.exists()) {
            LOGGER.error("Arquivo não encontrado: " + filePath);
            throw new RuntimeException("Arquivo não encontrado: " + filePath);
        }

        String fileContent = this.extractTextFromPDF(file);

        if (fileContent == null) {
            LOGGER.error("Erro ao extrair texto do PDF: " + filename);
            throw new RuntimeException("Erro ao extrair texto do PDF.");
        }

        saveDocumentToElasticsearch(fileContent);

        LOGGER.info("Upload iniciado para o arquivo: " + filename);
        this.objectStorageService.upload("docs", filename, filePath);
        file.delete();
        LOGGER.info("Arquivo processado e excluído: " + filename);
    }

    public String extractTextFromPDF(File file) {
        try (PDDocument document = PDDocument.load(file)) {
            PDFTextStripper pdfStripper = new PDFTextStripper();
            String extractedText = pdfStripper.getText(document);

            LOGGER.info("Texto extraído do PDF: " + extractedText.substring(0, Math.min(extractedText.length(), 100)) + "...");

            return extractedText;
        } catch (IOException e) {
            LOGGER.error("Erro ao carregar o arquivo PDF: " + file.getAbsolutePath(), e);
        }
        return null;
    }
    public List<FileInfoDTO> getDocuments() {
        return objectStorageService.listFileInfos();
    }


    public void saveDocumentToElasticsearch(String docContent) {
        String docTitle = generateDocTitle(docContent);
        DocumentModel documentModel = new DocumentModel();
        documentModel.setTitle(docTitle);
        documentModel.setContent(docContent);

        elasticService.saveDocument(documentModel);
    }

    public static String generateDocTitle(String input) {
        if (input == null || input.isEmpty()) {
            return "";
        }

        String normalized = input.replaceAll("\\s+", " ").trim();

        return normalized.length() > 60 ? normalized.substring(0, 60) : normalized;
    }
}
