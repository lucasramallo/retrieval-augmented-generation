# RAG - Retrieval-Augmented Generation

Este projeto implementa um sistema de **Retrieval-Augmented Generation (RAG)**, onde documentos são carregados e armazenados para fornecer contexto a uma **Large Language Model (LLM)**. O processo envolve a extração de texto de arquivos PDF e o armazenamento desses documentos em um serviço de armazenamento de objetos (MinIO). O contexto é acessado via **Elasticsearch**, permitindo que o modelo de linguagem busque informações relevantes durante a geração de respostas.

![Java](https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=java&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![MinIO](https://img.shields.io/badge/MinIO-3E8C5F?style=for-the-badge&logo=minio&logoColor=white)
![Elasticsearch](https://img.shields.io/badge/Elasticsearch-005571?style=for-the-badge&logo=elasticsearch&logoColor=white)
![Maven](https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white)

![image](https://github.com/user-attachments/assets/11d477dd-2a8d-4b0f-875a-77e265545b26)

## Funcionalidades

- **Upload de Arquivos:** Permite o upload de documentos (atualmente em formato PDF) para o sistema de armazenamento MinIO.
- **Extração de Texto:** O conteúdo dos documentos é extraído utilizando a biblioteca **Apache PDFBox**.
- **Armazenamento de Documentos:** Os documentos extraídos são armazenados em um serviço de armazenamento de objetos (MinIO) para uso futuro.
- **Busca de Contexto:** O sistema utiliza o **Elasticsearch** para indexar e buscar documentos relevantes com base em consultas de entrada.
- **Integração com LLM:** A LLM recebe documentos relevantes como contexto durante a geração de respostas.

## Pré-requisitos

Antes de executar o projeto, certifique-se de ter o seguinte instalado:

- **Java 17+** (JDK)
- **Apache Maven** (para gerenciamento de dependências e build)
- **MinIO** (ou outro serviço compatível com S3)
- **Elasticsearch** (para indexação e busca de documentos)

## Configuração

1. **Configuração do MinIO:**

   Configure o MinIO (ou o serviço de armazenamento de objetos escolhido) e adicione as credenciais no arquivo `application.properties` ou `application.yml`:

   ```properties
   minio.url=http://localhost:9000
   minio.access-key=your-access-key
   minio.secret-key=your-secret-key

## Configuração do Elasticsearch

Certifique-se de que o Elasticsearch esteja configurado corretamente. Adicione as configurações necessárias para conectar ao Elasticsearch no arquivo `application.properties` ou `application.yml`:

```properties
elasticsearch.host=http://localhost:9200
elasticsearch.index=documents
