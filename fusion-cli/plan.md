# Plan: Fusion-CLI Core Intelligence Upgrade

## Phase 1: Persistence Layer
Establish the "Neural Memory" for session tracking.

- [x] **Task 1.1:** Create `src/core/SessionManager.ts` to handle session I/O.
- [x] **Task 1.2:** Update `src/index.tsx` to automatically load the last active session on boot.
- [x] **Task 1.3:** Implement `/list-sessions` command in the TUI.

## Phase 2: Multi-Model Architecture
Implement the provider abstraction layer.

- [x] **Task 2.1:** Refactor `src/brain-node/Brain.ts` into a `ProviderFactory`.
- [x] **Task 2.2:** Implement `GeminiProvider` and `ClaudeProvider` (Stub).
- [x] **Task 2.3:** Add `/model [NAME]` command to switch active providers.

## Phase 3: Global Context Ingestion
Enable mass file reading for deep repository understanding.

- [x] **Task 3.1:** Implement `src/core/ContextIngestor.ts` to scan and aggregate project files.
- [x] **Task 3.2:** Add `/ingest [PATH]` command to the TUI.
- [x] **Task 3.3:** Integrate ingested context into the primary Brain prompt.

## Phase 4: Final Verification
Ensure stability and security.

- [x] **Task 4.1:** Run full integration tests on `FusionOrchestrator`.
- [x] **Task 4.2:** Security audit: Ensure `PolicyEngine` gates all new mass-read operations.
- [x] **Task 4.3:** Update `README.md` with new multi-model instructions.
