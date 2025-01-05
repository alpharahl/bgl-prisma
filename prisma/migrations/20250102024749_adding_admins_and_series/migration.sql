-- CreateTable
CREATE TABLE "Admins" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "breakGlass" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Series" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "leagueId" INTEGER NOT NULL,
    CONSTRAINT "Series_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
