# OrbX Frontend

Frontend do projeto **OrbX**, desenvolvido com **React + Vite**, focado
em performance, modularidade e integração perfeita com o OrbX Backend.\
A interface oferece visualização de mapas, dados de países, cidades e
serviços geográficos utilizando diversas APIs internas.

------------------------------------------------------------------------

## 📁 Estrutura do Projeto

    ├── public
    ├── src
    │   ├── assets
    │   ├── components
    │   │   ├── Services
    │   │   │   ├── DynamicMap.tsx
    │   ├── pages
    │   │   ├── Country.tsx
    │   │   ├── City.tsx
    │   │   ├── Home.tsx
    │   ├── services
    │   │   ├── api.ts
    │   ├── App.tsx
    │   ├── main.tsx
    ├── index.html
    ├── vite.config.ts
    └── package.json

------------------------------------------------------------------------

## ✨ Funcionalidades principais

-   Interface construída com **React + TypeScript**
-   Build rápido com **Vite**
-   Componentes reutilizáveis e organizados
-   Consumo do OrbX Backend via serviços Axios
-   Página de detalhes de países e cidades
-   Integração com mapas dinâmicos (como o componente `DynamicMap`)
-   Suporte para navegação via **react-router-dom**
-   Estrutura limpa e escalável

------------------------------------------------------------------------

## 📦 Tecnologias utilizadas

-   **React**
-   **Vite**
-   **TypeScript**
-   **Axios**
-   **React Router**
-   **Leaflet / Map Libraries** 
-   **Context API / Hooks personalizados**

------------------------------------------------------------------------

## 🚀 Como iniciar o projeto

### 1. Clone o repositório

``` bash
git clone https://github.com/Madhs31/OrbX_Frontend.git
cd OrbX_Frontend
```

### 2. Instale as dependências

``` bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz (se necessário), por exemplo:

    VITE_API_URL="http://localhost:4000"

### 4. Inicie o servidor de desenvolvimento

``` bash
npm run dev
```

Acesse no navegador:

    http://localhost:5173

------------------------------------------------------------------------

## 🔄 Comunicação com o Backend

Toda a comunicação é feita via Axios usando o serviço:

    src/services/api.ts

Exemplo:

``` ts
import { geoAPI } from "../services/api";

geoAPI.get("/countries");
```
