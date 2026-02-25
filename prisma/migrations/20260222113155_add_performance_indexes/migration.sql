-- CreateIndex
CREATE INDEX "active_session_lastActiveAt_idx" ON "active_session"("lastActiveAt");

-- CreateIndex
CREATE INDEX "active_session_documentId_lastActiveAt_idx" ON "active_session"("documentId", "lastActiveAt");

-- CreateIndex
CREATE INDEX "document_createdAt_idx" ON "document"("createdAt");

-- CreateIndex
CREATE INDEX "document_filename_idx" ON "document"("filename");

-- CreateIndex
CREATE INDEX "document_ownerId_updatedAt_idx" ON "document"("ownerId", "updatedAt");
