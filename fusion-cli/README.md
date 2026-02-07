# Fusion-CLI: Neural Orchestration Terminal
**Project:** Outside We Stand Eternally (MWA)  
**Version:** 1.1.0-INTELLIGENCE_UPGRADE

---

## 🌌 Overview
Fusion-CLI is a next-generation command-line interface that merges high-volume intelligence with high-precision operational logic. It serves as the unified command center for developing and scaling the MWA Universal Template.

## 🧠 Core Intelligence Features

### 1. Neural Memory (Persistence)
- **Sessions:** Every conversation is preserved in `src/data/sessions/`.
- **Context Continuity:** Automatically resumes the last active session on boot.
- **Commands:** 
  - `/list-sessions`: List all available session transcripts.

### 2. Multi-Model Orchestration
- **Provider Factory:** Hot-swap between different AI backends at runtime.
- **Providers:** 
  - **Gemini:** Primary strategic engine (Gemini 2.0 Flash/Pro).
  - **Claude:** Precision refactoring provider (Stub implemented).
- **Commands:**
  - `/model [NAME]`: Switch active provider (e.g., `/model claude`).

### 3. Global Context Ingestion
- **Repository Awareness:** Read and aggregate the entire `src` directory into the active brain context.
- **Security Gated:** Mass-reads are monitored by the Policy Engine to prevent accidental system access.
- **Commands:**
  - `/ingest [PATH]`: Scan and ingest files from the specified path (defaults to current project).

---

## 🛡️ Cybernetic Architecture

### 1. The Brain (Provider Manager)
- Handles multimodal ingestion and recursive task decomposition.
- **Location:** `src/brain-node/`

### 2. The Body (Operational Layer)
- **Policy Engine:** A security shield gating shell execution and mass-file reads.
- **Surgical Diff:** Precision patching logic for targeted code changes.
- **State Manager:** Automatic filesystem snapshots (`.fusion_snapshots`) for rollback/recovery.
- **Location:** `src/core/`

---

## 🚀 Getting Started

### Prerequisites
- Node.js v20+
- Google AI Studio API Key (set in `.env.local`)

### Installation
```bash
cd F:\MWA\fusion-cli
npm install
```

### Launching the Neural Link
```bash
npm start
```

### Running Verification
```bash
npm test
```

---
*Developed by Call Sign 'L' for Outside We Stand Eternally.*