import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import styles from "../../styles/Apidoc.module.css";

interface CodeBlockProps {
  code: string;
  language?: string;
}

function CodeBlock({ code, language = "bash" }: CodeBlockProps) {
  return (
    <div className={styles.codeBlock}>
      <ScrollArea className={styles.scrollArea}>
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          wrapLines
          wrapLongLines
        >
          {code}
        </SyntaxHighlighter>
      </ScrollArea>
    </div>
  );
}

export default function RagPage() {
  const configInstructions = `
# ================================
# Configurações do MinIO
# ================================
minio.url=http://localhost:9000
minio.access-key=YOUR-ACCESS-KEY
minio.secret-key=YOUR-SECRET-KEY

# ================================
# Configurações do Elasticsearch
# ================================
spring.data.elasticsearch.username=USERNAME
spring.data.elasticsearch.password=PASSWORD
spring.elasticsearch.username=USERNAME
spring.elasticsearch.password=PASSWORD

# ================================
# API externa (ex: Groq)
# ================================
groq.api.key=YOUR-GROQ-API-KEY
`.trim();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>RAG - Retrieval-Augmented Generation</h1>
      <p className={styles.description}>
        Este projeto implementa um sistema de{" "}
        <strong>Retrieval-Augmented Generation (RAG)</strong>, onde documentos
        são carregados e armazenados para fornecer contexto a uma
        <strong> Large Language Model (LLM)</strong>. O processo envolve a
        extração de texto de arquivos PDF e o armazenamento desses documentos em
        um serviço de armazenamento de objetos (MinIO). O contexto é acessado
        via <strong>Elasticsearch</strong>, permitindo que o modelo de linguagem
        busque informações relevantes durante a geração de respostas.
      </p>

      <div className={styles.badges}>
        <Badge>Java</Badge>
        <Badge>Spring Boot</Badge>
        <Badge>MinIO</Badge>
        <Badge>Elasticsearch</Badge>
        <Badge>Maven</Badge>
      </div>

      <Card className={styles.card}>
        <CardHeader>
          <CardTitle>Funcionalidades</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            <li>📄 Upload de Arquivos (PDFs)</li>
            <li>🔍 Extração de texto com Apache PDFBox</li>
            <li>📦 Armazenamento no MinIO</li>
            <li>🔎 Busca contextual com Elasticsearch</li>
            <li>🤖 Integração com LLM via Groq</li>
          </ul>
        </CardContent>
      </Card>

      <div className={styles.alert}>
        Para que a aplicação funcione corretamente, é necessário:
        <ul>
          <li>
            MinIO rodando localmente em <code>http://localhost:9000</code>
          </li>
          <li>
            Elasticsearch acessível em <code>https://localhost:9200</code>
          </li>
          <li>
            Uma conta ativa com chave da API da <strong>Groq</strong>
          </li>
        </ul>
      </div>

      <Tabs defaultValue="configs" className={styles.tabs}>
        <TabsList>
          <TabsTrigger value="configs">application.properties</TabsTrigger>
        </TabsList>
        <TabsContent value="configs">
          <CodeBlock code={configInstructions} language="properties" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
