package com.lucasramalho.rag.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

/**Adicionar mertadados da pesquisa*/
@Document(indexName = "docs")
@Data
public class DocumentModel {
    @Id
    private String id;

    @Field(type = FieldType.Text, analyzer = "custom_analyzer")
    private String title;

    @Field(type = FieldType.Text, analyzer = "standard")
    private String content;
}
