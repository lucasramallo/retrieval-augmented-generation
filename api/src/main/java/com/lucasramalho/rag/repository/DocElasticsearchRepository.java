package com.lucasramalho.rag.repository;

import com.lucasramalho.rag.model.DocumentModel;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@ConditionalOnProperty(name = "elasticsearch.enabled", havingValue = "true", matchIfMissing = false)
public interface DocElasticsearchRepository extends ElasticsearchRepository<DocumentModel, String> {

    @Query("""
        {
          "bool": {
            "should": [
              {
                "match": {
                  "content": {
                    "query": "?0",
                    "operator": "or"
                  }
                }
              }
            ]
          }
        }
    """)
    List<DocumentModel> searchByContent(String queryText);

}


