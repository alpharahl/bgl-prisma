-- AlterTable
ALTER TABLE "Series" ADD COLUMN "description" TEXT;

-- CreateTable
CREATE TABLE "Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "time" DATETIME NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "seriesId" INTEGER NOT NULL,
    CONSTRAINT "Event_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
