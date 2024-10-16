# TRACK: AI-Powered Commit & PR Summarizer for Changelogs

TRACK is a Next.js and Node.js application designed to help developers quickly and easily generate changelogs from their Git commits and pull requests (PRs) using Llama 3.1 AI. It allows developers to focus on building by automating the tedious process of summarizing multiple commits and PRs into a human-readable changelog. 

This project was built to solve the following challenges:
1. Scanning multiple commits over several days to find relevant changes.
2. Summarizing those changes concisely for end-users (developers) in changelogs.

TRACK makes it easier by using LLM technology to generate summaries, titles, and tags for changelogs, which can be published to a public-facing website for users to see.

## Why TRACK?
Maintaining developer tools often requires frequent updates, and writing changelogs is time-consuming. With TRACK, we automate that process using Llama 3.1 to generate concise, relevant changelogs from multiple commits. This streamlines the workflow for developers by reducing the manual work and giving them more time to focus on development.

## Features

- **AI-Generated Changelogs**: Summarize multiple Git commits and PRs into developer-friendly changelogs.
- **Public Changelog Page**: A simple, public-facing website where generated changelogs can be published for end-users to see.
- **AI Summarization**: Powered by **Llama 3.1-70B-Versatile** (via GROQ Cloud) to summarize changes into clear, concise bullet points.
- **GitHub Integration**: Fetch commits and PRs directly from GitHub using Git APIs.
- **Backend Caching**: Node.js caching implemented for efficient backend performance when fetching data from GitHub.

## Tech Stack

- **Frontend**: Next.js (React + TypeScript)
- **Backend**: Node.js, Prisma ORM, PostgreSQL, GitHub API, Llama 3.1 AI
- **AI Model**: Llama 3.1-70B-Versatile (using GROQ Cloud)
- **Database**: PostgreSQL
- **Styling**: Tailwind CSS
- **Caching**: Node.js-based caching for API performance optimization.

## Architecture and Technical Decisions

### Why Llama 3.1-70B-Versatile?
We chose **Llama 3.1-70B-Versatile** as it provides a balance between power and efficiency for summarizing technical changelogs. By using GROQ Cloud for deployment, we could offload the AI-heavy tasks to a specialized cloud service, ensuring performance and scalability.

### Node.js Caching
To handle frequent GitHub API requests, we implemented a Node.js caching layer in the backend. This helps improve response times when fetching multiple commits and PRs, reducing the overall latency when generating changelogs.

### Prisma + PostgreSQL
We chose Prisma for database management due to its powerful type-safe ORM capabilities, making it easy to work with PostgreSQL and ensuring seamless integration between the Next.js frontend and the Node.js backend.

## File Structure

```bash
.
├── app
│   ├── changelogs
│   │   └── page.tsx
│   ├── components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Text.tsx
│   │   └── ui
│   │       ├── badge.tsx
│   │       ├── card.tsx
│   │       ├── compare.tsx
│   │       ├── dialog.tsx
│   │       └── sparkles.tsx
│   ├── dashboard
│   │   ├── devlogs
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── developer
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── fonts
│   │   ├── GeistMonoVF.woff
│   │   └── GeistVF.woff
│   ├── globals.css
│   ├── layout.tsx
│   ├── lib
│   │   └── utils.ts
│   ├── page.tsx
│   └── user
│       └── page.tsx
├── components
│   └── ui
│       ├── alert.tsx
│       └── table.tsx
└── lib
    └── utils.ts

15 directories, 24 files
