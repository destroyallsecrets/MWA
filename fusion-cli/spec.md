# Specification: Fusion-CLI Core Intelligence Upgrade

## 🌌 Overview
This track focuses on evolving the `fusion-cli` brain from a single-model relay into a multi-model orchestrator. It implements persistent conversational memory and the ability to leverage external models (Claude, GPT) alongside the primary Gemini engine.

## 🎯 Success Criteria
- [ ] **Persistent State:** Conversations are saved to `src/data/sessions/` and can be resumed after CLI restart.
- [ ] **Multi-Model Routing:** Ability to toggle between `gemini`, `claude`, and `gpt` providers via `/model` command.
- [ ] **Context Ingestion:** Large-scale file ingestion (>10 files) via Gemini's 1M context window.
- [ ] **Verification:** Built-in health check for API keys and connection status.

## 🛠️ Technical Stack
- **Languages:** TypeScript (ESM)
- **Primary AI:** Gemini 2.0 Flash/Pro (@google/genai)
- **Model Proxy:** LiteLLM (Optional/Conceptual)
- **Storage:** JSON-based session transcripts.

## 👤 User Stories
- "As a developer, I want to resume my development session from yesterday without losing context."
- "As a developer, I want to use Claude 3.5 for precise refactoring while using Gemini for broad planning."
- "As a developer, I want to ingest my entire `src` directory into the CLI context for a global code review."
