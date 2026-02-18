# ShopEase Frontend

The frontend application for the ShopEase e-commerce platform, built with **React**, **TypeScript**, **Vite**, and **TailwindCSS v4**.

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 7
- **Language**: TypeScript 5.9
- **Styling**: TailwindCSS 4
- **UI Components**: Radix UI + shadcn/ui
- **Routing**: React Router DOM 7
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 20+ (LTS recommended)

### Installation

```bash
npm install
```

### Environment Setup

```bash
cp .env.example .env
# Edit .env with your backend API URL
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run preview   # Preview the production build locally
```

## Scripts

| Script            | Description                                 |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | Start Vite dev server with HMR              |
| `npm run build`   | Type-check and build for production         |
| `npm run preview` | Preview production build locally            |
| `npm run lint`    | Run ESLint checks                           |
| `npm start`       | Serve the built `dist/` folder (production) |

## Project Structure

```
├── src/               # Application source code
├── public/            # Static assets
├── index.html         # HTML entry point
├── Dockerfile         # Container image build
├── apprunner.yaml     # AWS App Runner config
├── vite.config.ts     # Vite configuration
├── components.json    # shadcn/ui configuration
└── package.json       # Dependencies and scripts
```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment guides.

## Docker

See [DOCKER.md](./DOCKER.md) for Docker build and push instructions.
