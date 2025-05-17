"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export default function GettingStartedPage() {
  const installSteps = `
git clone https://github.com/seu-usuario/repo.git
cd repo
pnpm install
pnpm dev
  `.trim();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🚀 Primeiros Passos</h1>
      <p className={styles.description}>
        Siga os comandos abaixo para clonar o projeto e iniciar o ambiente de
        desenvolvimento local:
      </p>

      <div className={styles.badges}>
        <Badge>Next.js</Badge>
        <Badge>TypeScript</Badge>
        <Badge>ShadCN</Badge>
        <Badge>pnpm</Badge>
      </div>

      <Card className={styles.card}>
        <CardHeader>
          <CardTitle>Instalação</CardTitle>
        </CardHeader>
        <CardContent>
          <CodeBlock code={installSteps} />
        </CardContent>
      </Card>
    </div>
  );
}
