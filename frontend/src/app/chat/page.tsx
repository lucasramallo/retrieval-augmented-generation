'use client';

import { useState } from 'react';
import styles from '../../styles/Chat.module.css';
import { Textarea } from '@/components/ui/textarea';

interface Message {
  sender: 'user' | 'assistant';
  text: string;
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'assistant', text: 'Olá! Em que posso te ajudar hoje?' },
    { sender: 'user', text: 'Qual a diferença entre IA simbólica e conexionista?' },
    { sender: 'assistant', text: 'A IA simbólica usa lógica e regras explícitas, enquanto a conexionista se baseia em redes neurais e aprendizado com dados.' },
  ]);
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    const newMessage: Message = { sender: 'user', text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput('');

    const assistantReply: Message = {
      sender: 'assistant',
      text: 'Esta é uma resposta do sistema RAG simulada.',
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, assistantReply]);
    }, 500);
  };

  return (
    <div className={styles.container}>
      <div className={styles.messages}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={msg.sender === 'user' ? styles.userMessage : styles.assistantMessage}
          >
            {msg.text}
          </div>
        ))}
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
