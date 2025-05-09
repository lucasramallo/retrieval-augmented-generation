import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { ReactNode } from 'react'
import { MessageCircle, Share2, BarChart3 } from 'lucide-react'

export default function Home() {
  return (
    <>
      <Head>
        <title>Rag.dev</title>
        <meta name="description" content="Plataforma de chat inteligente para adicionar contexto RAG" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>Rag.dev</h1>
          <p className={styles.subtitle}>
            Este projeto implementa um sistema de Retrieval-Augmented Generation (RAG), no qual documentos são carregados e armazenados para fornecer contexto adicional a uma Large Language Model (LLM). Com base nesses documentos, o sistema oferece uma interface de chat que permite ao usuário obter respostas mais precisas, relevantes e fundamentadas no conteúdo fornecido.
          </p>
          <div className={styles.actions}>
            <a href="/context" className={styles.buttonPrimary}>Começar</a>
            <a href="#" className={styles.buttonSecondary}>Documentação</a>
          </div>
        </section>

        <section className={styles.features}>
          <FeatureCard icon={<MessageCircle className={styles.icon} />} title="O que é RAG?">
            Combina LLMs com recuperação de dados externos para respostas mais precisas, mesmo fora do conhecimento original do modelo.
          </FeatureCard>
          <FeatureCard icon={<BarChart3 className={styles.icon} />} title="Por que usar RAG?">
            Reduz alucinações e aumenta a confiança nas respostas com base em fontes reais de informação.
          </FeatureCard>
          <FeatureCard icon={<Share2 className={styles.icon} />} title="Casos de Uso">
            Ideal para suporte ao cliente, chatbots, busca inteligente e aplicações que precisam de respostas atualizadas.
          </FeatureCard>
        </section>
      </main>
    </>
  )
}

type FeatureCardProps = {
  icon: ReactNode
  title: string
  children: ReactNode
}

function FeatureCard({ icon, title, children }: FeatureCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardIcon}>{icon}</div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardText}>{children}</p>
    </div>
  )
}
