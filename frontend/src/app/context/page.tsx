"use client";

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/Context.module.css";
import { FileUpload } from "primereact/fileupload";
import "primereact/resources/themes/lara-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { FileUploadHandlerEvent } from "primereact/fileupload";

// Definindo a tipagem para o fileUploadRef
const documents = [
  {
    title: "Relatório Financeiro Q1",
    description:
      "Relatório detalhado do desempenho financeiro da empresa no primeiro trimestre, incluindo receitas, d...",
    url: "/docs/relatorio-financeiro-q1.pdf",
  },
  {
    title: "Política de Home Office",
    description:
      "Documento oficial com diretrizes para o trabalho remoto, incluindo regras de conduta, metas de produ...",
    url: "/docs/politica-home-office.pdf",
  },
  {
    title: "Contrato de Prestação de Serviços",
    description:
      "Contrato firmado entre a empresa e fornecedores terceirizados, especificando escopo de trabalho, pra...",
    url: "/docs/contrato-prestacao.pdf",
  },
];

export interface FileInfoDTO {
  name: string;
  url: string;
  description: string;
}

const truncateText = (text: string, maxLength = 110) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
};

const Page = () => {
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<FileInfoDTO[]>([]);
  const [needFetchData, setNeedFetchData] = useState(true);

  const fileUploadRef = useRef<FileUpload | null>(null);

  useEffect(() => {
    fetchFiles();
    setNeedFetchData(false);
  }, [needFetchData]);

  const handleUpload = async (event: FileUploadHandlerEvent) => {
    const files = event.files;

    setUploading(true);

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          "http://localhost:8080/api/files/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(
          `Upload de ${file.name} realizado com sucesso`,
          response.data
        );
      } catch (error) {
        console.error(`Erro ao enviar ${file.name}:`, error);
      }
    }

    setUploading(false);
    setNeedFetchData(true);

    if (fileUploadRef.current) {
      fileUploadRef.current.clear();
    }
  };

  async function fetchFiles() {
    try {
      const response = await axios.get<FileInfoDTO[]>(
        "http://localhost:8080/api/files"
      );

      setFiles(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao buscar arquivos:", error);
      return [];
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.uploadSection}>
        <FileUpload
          ref={fileUploadRef}
          multiple
          mode="advanced"
          chooseLabel="Choose"
          uploadLabel="Upload"
          cancelLabel="Cancel"
          customUpload={true}
          uploadHandler={handleUpload}
          auto={false}
          accept="application/pdf"
          className={styles.uploader}
          disabled={uploading}
        />
      </div>
      <h2 className={styles.contextTitle}>Your context</h2>
      <div className={styles.contextGrid}>
        {files.map((doc, index) => (
          <Card key={index} className={styles.card}>
            <CardContent className={styles.cardContent}>
              <div className={styles.cardHeader}>
                <FileText size={25} className={styles.icon} />
                <h3 className={styles.title}>{doc.name}</h3>
              </div>
              <p className={styles.description}>
                {truncateText(doc.description)}
              </p>
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.viewButton}
              >
                Visualizar
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Page;
