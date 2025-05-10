"use client";

import { useState, useEffect, useRef } from "react";
import styles from "../../styles/Chat.module.css";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { BounceLoader } from "react-spinners";

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
  ]);
  const [input, setInput] = useState("");
  const [waitingResponse, setWaitingResponse] = useState(false);

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

    const newMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    setWaitingResponse(true);

    try {
      const res = await sendPrompt(input);
      const assistantReply: Message = {
        sender: "assistant",
        text: res.content,
      };

      setTimeout(() => {
        setMessages((prev) => [...prev, assistantReply]);
      }, 500);

      setWaitingResponse(false);
    } catch (e) {
      console.log("Erro ao buscar resposta.");
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
            <span
              className={
                messages[messages.length - 1] === msg &&
                msg.sender === "assistant"
                  ? styles.typingEffect
                  : ""
              }
            >
              {msg.text}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
        {waitingResponse && (
          <div className="flex gap-2 items-center">
            <BounceLoader color="#fff" loading={true} size={30} />
            <div className={styles.fadePulse}>Buscando resposta...</div>
          </div>
        )}
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
