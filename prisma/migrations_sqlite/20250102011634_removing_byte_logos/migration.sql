/*
  Warnings:

  - You are about to drop the column `logo` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `logo` on the `League` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Game" ("id", "name") SELECT "id", "name" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
CREATE UNIQUE INDEX "Game_name_key" ON "Game"("name");
CREATE TABLE "new_League" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "acronymn" TEXT NOT NULL,
    "about" TEXT,
    "gameId" INTEGER NOT NULL,
    CONSTRAINT "League_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_League" ("about", "acronymn", "gameId", "id", "name") SELECT "about", "acronymn", "gameId", "id", "name" FROM "League";
DROP TABLE "League";
ALTER TABLE "new_League" RENAME TO "League";
CREATE UNIQUE INDEX "League_name_key" ON "League"("name");
CREATE UNIQUE INDEX "League_acronymn_key" ON "League"("acronymn");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
