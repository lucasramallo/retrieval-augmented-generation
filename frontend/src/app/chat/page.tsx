"use client";

import { useState, useEffect, useRef } from "react";
import styles from "../../styles/Chat.module.css";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

interface Message {
  sender: "user" | "assistant";
  text: string;
}

export interface RequestDTO {
  content: string;
}

export interface ResponseDTO {
  prompt: string;
  content: string;
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: "assistant", text: "Olá! Em que posso te ajudar hoje?" },
    {
      sender: "user",
      text: "Qual a diferença entre IA simbólica e conexionista?",
    },
    {
      sender: "assistant",
      text: "A IA simbólica usa lógica e regras explícitas, enquanto a conexionista se baseia em redes neurais e aprendizado com dados.",
    },
  ]);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const API_URL = "http://localhost:8080/chat";

  const sendPrompt = async (content: string): Promise<ResponseDTO> => {
    const requestData: RequestDTO = { content };

    try {
      const response = await axios.post<ResponseDTO>(API_URL, requestData);
      return response.data;
    } catch (error) {
      console.error("Erro ao enviar prompt:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    try {
      const res = await sendPrompt(input);
      const assistantReply: Message = {
        sender: "assistant",
        text: res.content,
      };

      const newMessage: Message = { sender: "user", text: input };
      setMessages((prev) => [...prev, newMessage]);
      setInput("");

      setTimeout(() => {
        setMessages((prev) => [...prev, assistantReply]);
      }, 500);
      setResponse(res.content);
    } catch (e) {
      setResponse("Erro ao buscar resposta.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.messages}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={
              msg.sender === "user"
                ? styles.userMessage
                : styles.assistantMessage
            }
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className={styles.inputContainer}>
        <Textarea
          placeholder="Digite sua pergunta..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={styles.textarea}
        />
        <button type="submit" className={styles.submitButton}>
          Enviar
        </button>
      </form>
    </div>
  );
}
