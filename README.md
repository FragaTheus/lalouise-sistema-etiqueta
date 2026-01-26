# 🏷️ Lalouise – Sistema de Gestão de Etiquetas Sanitárias

![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

---

## 📌 Sobre o Projeto

A **Lalouise** é uma empresa de **consultoria sanitária**, e este projeto tem como objetivo o desenvolvimento de um **Sistema de Gestão de Etiquetas Sanitárias**, voltado principalmente para **restaurantes japoneses**, atendendo às novas exigências de **controle de validade, temperatura e rastreabilidade de alimentos**.

O sistema foi idealizado para **garantir qualidade, segurança alimentar e conformidade sanitária**, reduzindo riscos operacionais e facilitando auditorias e inspeções.

---

## 🎯 Problema que o Sistema Resolve

Restaurantes japoneses lidam com produtos altamente sensíveis, como peixes crus, que exigem:

- Controle rigoroso de **temperatura**
- Validade dinâmica (em **horas**, não apenas dias)
- Rastreabilidade do produto desde a **entrada até a produção**
- Padronização das informações em **etiquetas sanitárias**

Este sistema centraliza e automatiza todo esse processo, minimizando erros humanos e aumentando a segurança sanitária.

---

## 🧩 Funcionamento do Sistema

O fluxo do sistema é dividido em **três grandes etapas**:

### 1️⃣ Recebimento do Produto
- Registro do produto entregue
- Comparação da **temperatura do produto** com a **temperatura ideal informada pelo fabricante**
- Geração de etiqueta sanitária inicial

### 2️⃣ Armazenamento
- Controle de produtos armazenados (geladeira, freezer, setores específicos)
- Registro de **data de validade**
- Associação do produto a um setor

### 3️⃣ Produção
- Produto retirado do armazenamento
- Geração de **nova etiqueta**
- Validade controlada em **horas**, conforme normas sanitárias
- Informação clara para uso em produção

---

## ✅ Requisitos Funcionais (MVP)

Os módulos do sistema serão entregues **nesta ordem**, garantindo funcionamento mínimo:

1. 👤 **Gerenciar Contas**
2. 🏭 **Gerenciar Setores**
4. 🧊 **Gerenciar de Armazenamento**
4. 📦 **Gerenciar de Produtos**
5. 🏷️ **Gerenciar de Etiquetas**
6. 🔔 **Sistema de Notificações**

---

## 🏗️ Arquitetura & Tecnologias

### 🔧 Backend
- **Java**
- **Spring Boot**
- Arquitetura em camadas
- API REST
- Containerização com **Docker**

### 🎨 Frontend
- **Next.js**
- **TypeScript**
- Interface moderna e responsiva
- Comunicação via API REST

### 🗄️ Banco de Dados
- **PostgreSQL**
- Modelagem focada em rastreabilidade e histórico sanitário

---

## 🚀 Objetivos Técnicos do Projeto

- Garantir **rastreabilidade completa** dos alimentos
- Facilitar auditorias sanitárias
- Reduzir erros manuais
- Criar um sistema escalável para outros segmentos alimentícios
- Atender normas sanitárias atuais e futuras

---

## 👨‍💻 Desenvolvedor

Projeto desenvolvido por:

**Matheus Fraga**  
**Desenvolvedor Full Stack**  

---

## 📄 Licença

### 🔒 Licença Proprietária

Este software é de **uso exclusivo da Lalouise Consultoria Sanitária**.

❌ **Não é open-source**  
❌ **Não é permitido copiar, modificar, distribuir ou reutilizar**, total ou parcialmente, sem autorização expressa do proprietário do software.

Todos os direitos reservados © Lalouise.

---

## 📬 Contato

Para informações comerciais, técnicas ou institucionais, entre em contato com a **Lalouise Consultoria Sanitária**.

---

> Este projeto está em desenvolvimento ativo e novas funcionalidades serão adicionadas conforme a evolução das necessidades sanitárias e operacionais.
