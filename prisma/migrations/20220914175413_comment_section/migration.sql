/*
  Warnings:

  - Added the required column `comment` to the `Responds` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Responds" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "comment" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "blogId" INTEGER NOT NULL,
    CONSTRAINT "Responds_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Responds_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Responds" ("blogId", "id", "userId") SELECT "blogId", "id", "userId" FROM "Responds";
DROP TABLE "Responds";
ALTER TABLE "new_Responds" RENAME TO "Responds";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
