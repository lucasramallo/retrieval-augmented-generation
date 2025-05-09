'use client';
import React from 'react';
import Header from '@/components/Header';
import styles from '../styles/Context.module.css';
import { FileUpload } from 'primereact/fileupload';
import 'primereact/resources/themes/lara-dark-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import { Card, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const documents = [
  {
    title: 'Relatório Financeiro Q1',
    description: 'Relatório detalhado do desempenho financeiro da empresa no primeiro trimestre, incluindo receitas, d...',
    url: '/docs/relatorio-financeiro-q1.pdf'
  },
  {
    title: 'Política de Home Office',
    description: 'Documento oficial com diretrizes para o trabalho remoto, incluindo regras de conduta, metas de produ...',
    url: '/docs/politica-home-office.pdf'
  },
  {
    title: 'Contrato de Prestação de Serviços',
    description: 'Contrato firmado entre a empresa e fornecedores terceirizados, especificando escopo de trabalho, pra...',
    url: '/docs/contrato-prestacao.pdf'
  }
];

const truncateText = (text: string, maxLength = 110) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

const Page = () => {
  return (
    <div className={styles.container}>
      <div className={styles.uploadSection}>
        <FileUpload
          mode="advanced"
          chooseLabel="Choose"
          uploadLabel="Upload"
          cancelLabel="Cancel"
          customUpload={true}
          auto={false}
          className={styles.uploader}
        />
      </div>
      <h2 className={styles.contextTitle}>Your context</h2>
      <div className={styles.contextGrid}>
        {documents.map((doc, index) => (
          <Card key={index} className={styles.card}>
            <CardContent className={styles.cardContent}>
              <div className={styles.cardHeader}>
                <FileText size={25} className={styles.icon} />
                <h3 className={styles.title}>{doc.title}</h3>
              </div>
              <p className={styles.description}>{truncateText(doc.description)}</p>
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
