package com.lucasramalho.rag.controller;

import com.lucasramalho.rag.model.DocumentModel;
import com.lucasramalho.rag.service.ElasticService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@ConditionalOnProperty(name = "elasticsearch.enabled", havingValue = "true", matchIfMissing = false)
@RequestMapping("/documents")
public class ElasticController {

    @Autowired
    private ElasticService documentService;

    @GetMapping("/search")
    public List<DocumentModel> search(@RequestParam String query) {
        return documentService.searchDocuments(query);
    }
}
