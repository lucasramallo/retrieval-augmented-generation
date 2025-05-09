package com.lucasramalho.rag.controller;

import com.lucasramalho.rag.dto.RequestDTO;
import com.lucasramalho.rag.dto.ResponseDTO;
import com.lucasramalho.rag.service.RagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/chat")
public class RagController {
    @Autowired
    public RagService ragService;

    @PostMapping
    public ResponseEntity<ResponseDTO> getResponse(@RequestBody RequestDTO request) {
        String response = ragService.getIAModelResponse(request.content());
        ResponseDTO responseDTO = new ResponseDTO(request.content(), response);

        return ResponseEntity.ok(responseDTO);
    }
}
