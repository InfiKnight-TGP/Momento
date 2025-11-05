-- CreateTable
CREATE TABLE "Memory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "imageUrl" TEXT NOT NULL,
    "story" TEXT NOT NULL,
    "title" TEXT DEFAULT 'Untitled Memory',
    "description" TEXT,
    "emotions" TEXT,
    "people" TEXT,
    "themes" TEXT,
    "locations" TEXT,
    "events" TEXT,
    "embedding" TEXT,
    "keywords" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "Memory_createdAt_idx" ON "Memory"("createdAt");
