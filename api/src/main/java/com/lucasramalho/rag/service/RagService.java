package com.lucasramalho.rag.service;

import com.lucasramalho.rag.dto.groq.GroqRequestDTO;
import com.lucasramalho.rag.dto.groq.GroqResponseResponse;
import com.lucasramalho.rag.dto.groq.Message;
import com.lucasramalho.rag.model.DocumentModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Serviço responsável por interagir com a API Groq utilizando o modelo
 * {@code deepseek-r1-distill-llama-70b} para obter respostas a partir de prompts fornecidos.
 * <p>
 * A chave de API é injetada a partir do arquivo de configuração da aplicação
 * usando a propriedade {@code groq.api.key}.
 * </p>
 *
 * @author Lucas
 */
@Service
public class RagService {

    @Value("${groq.api.key}")
    private String API_KEY;

    @Autowired
    private ElasticService documentService;

    public String getIAModelResponse(String request) {
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://api.groq.com/openai/v1/chat/completions";

        final int TOKEN_LIMIT = 5500; // Isso por conta de uma limitação nos tokens do plano que estou utilizando da Groq
        final int CHAR_LIMIT = TOKEN_LIMIT * 4;

        List<DocumentModel> docMatches = documentService.searchDocuments(request);

        String context = docMatches.stream()
                .map(DocumentModel::getContent)
                .collect(Collectors.joining(" "));

        if (context.length() > CHAR_LIMIT) {
            context = context.substring(0, CHAR_LIMIT);
        }

        String prompt = "Leia atentamente o seguinte contexto e forneça uma resposta **exclusivamente** com base nas informações **contidas** nesse contexto. " +
                "**Não** busque, adivinhe, inferir ou acrescente quaisquer informações externas, mesmo que o contexto esteja incompleto ou incorreto. " +
                "**Não** corrija ou tente preencher lacunas com base em seu conhecimento prévio ou informações que não foram fornecidas. " +
                "Sua resposta deve se limitar **única e exclusivamente** ao que está descrito no contexto a seguir. " +
                "Quando for responder não responda nada como 'De acordo com o contexto', apenas responda\n\n" +
                "Contexto:\n" + context + "\n" +
                "Pergunta:\n" + request
        ;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(API_KEY);

        GroqRequestDTO requestBody = new GroqRequestDTO();
        requestBody.setModel("deepseek-r1-distill-llama-70b");
        requestBody.setMessages(List.of(new Message("user", prompt)));

        HttpEntity<GroqRequestDTO> groqRequest = new HttpEntity<>(requestBody, headers);

        ResponseEntity<GroqResponseResponse> response =
                restTemplate.postForEntity(url, groqRequest, GroqResponseResponse.class);

        String rawContent = response.getBody()
                .getChoices().get(0)
                .getMessage().getContent();

        String cleanContent = rawContent.replaceAll("(?s)<think>.*?</think>", "").trim();

        return cleanContent;
    }
}
