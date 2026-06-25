# Sonoriza Campanhas

Repositório de campanhas visuais do [Sonoriza](https://appsonoriza.com.br) para Instagram.

## Sobre

Carrosséis semanais **"No Radar do Sonoriza"** — curadoria dos principais eventos do Nordeste publicada toda semana no Instagram.

Cada campanha é gerada a partir de um arquivo HTML com os slides da semana, exportados como PNGs via Puppeteer.

## Estrutura

```
campanha.html   # slides da semana (fonte de verdade)
capture.js      # exporta cada slide como PNG (1080×1350px)
package.json
```

## Como usar

### 1. Instalar dependências

```bash
npm install
```

### 2. Atualizar o conteúdo

Edite `campanha.html` com os eventos da semana. Cada slide é um `.frame-col` dentro do `.wrap`.

### 3. Exportar os slides

```bash
node capture.js
```

Os arquivos `slide-01.png` a `slide-NN.png` serão gerados na raiz do projeto.

> Os PNGs não são versionados (`.gitignore`). Gere localmente antes de publicar.

## Branches

Cada semana de campanha vive em sua própria branch:

| Branch   | Período              |
|----------|----------------------|
| `week-2` | 25 jun – 1 jul 2026  |

## Stack

- HTML + CSS (Google Fonts: Syne + DM Sans)
- Puppeteer (export PNG)
