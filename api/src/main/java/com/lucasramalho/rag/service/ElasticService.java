package com.lucasramalho.rag.service;

import com.lucasramalho.rag.model.DocumentModel;
import com.lucasramalho.rag.repository.DocElasticsearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@ConditionalOnProperty(name = "elasticsearch.enabled", havingValue = "true", matchIfMissing = false)
public class ElasticService {

    @Autowired
    private DocElasticsearchRepository documentRepository;

    public List<DocumentModel> searchDocuments(String queryText) {
        return documentRepository.searchByContent(queryText);
    }

    public DocumentModel saveDocument(DocumentModel document) {
        return documentRepository.save(document);
    }

    public Optional<DocumentModel> getDocumentById(String id) {
        return documentRepository.findById(id);
    }

    public Iterable<DocumentModel> getAllDocuments() {
        return documentRepository.findAll();
    }

    public void deleteDocument(String id) {
        documentRepository.deleteById(id);
    }
}

