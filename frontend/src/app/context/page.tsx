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
import { Progress } from "@/components/ui/progress";
import { Toast } from "primereact/toast";

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
  const [progresCounter, setProgresCounter] = useState(0);

  const fileUploadRef = useRef<FileUpload | null>(null);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    fetchFiles();
    setNeedFetchData(false);
  }, [needFetchData]);

  useEffect(() => {
    setTimeout(() => setProgresCounter((prev) => prev + 1), 100);
  }, [progresCounter, uploading]);

  const showSuccessToast = () => {
    toast.current?.show({
      severity: "success",
      summary: "Sucesso!",
      detail: "Documento(s) enviados com sucesso!",
      life: 5000,
    });
  };

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

    showSuccessToast();
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
      <Toast ref={toast} />
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
          emptyTemplate={
            <p className="m-0">Drag and drop files to here to upload.</p>
          }
        />
        {uploading && <Progress value={0} />}
      </div>
      <h2 className={styles.contextTitle}>Your context</h2>
      <div className={styles.contextGrid}>
        {files.length === 0 && <span>No context yet.</span>}
        {files.map((doc, index) => (
          <Card key={index} className={styles.card}>
            <CardContent className={styles.cardContent}>
              <div className={styles.cardHeader}>
                <i className="pi pi-file-pdf"></i>
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
