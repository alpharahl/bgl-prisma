/*
  Warnings:

  - Added the required column `link` to the `Sponsor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Sponsor` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_League" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "acronymn" TEXT NOT NULL,
    "about" TEXT,
    "gameId" INTEGER NOT NULL,
    "logo" TEXT,
    "discord" TEXT,
    "hidden" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "League_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_League" ("about", "acronymn", "discord", "gameId", "id", "logo", "name") SELECT "about", "acronymn", "discord", "gameId", "id", "logo", "name" FROM "League";
DROP TABLE "League";
ALTER TABLE "new_League" RENAME TO "League";
CREATE UNIQUE INDEX "League_name_key" ON "League"("name");
CREATE UNIQUE INDEX "League_acronymn_key" ON "League"("acronymn");
CREATE TABLE "new_Series" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "leagueId" INTEGER NOT NULL,
    "description" TEXT,
    "hidden" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Series_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Series" ("description", "id", "leagueId", "logo", "name") SELECT "description", "id", "leagueId", "logo", "name" FROM "Series";
DROP TABLE "Series";
ALTER TABLE "new_Series" RENAME TO "Series";
CREATE TABLE "new_Sponsor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "leagueId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Sponsor_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Sponsor" ("id", "leagueId") SELECT "id", "leagueId" FROM "Sponsor";
DROP TABLE "Sponsor";
ALTER TABLE "new_Sponsor" RENAME TO "Sponsor";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
