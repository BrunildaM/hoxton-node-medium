/*
  Warnings:

  - You are about to drop the `_UserTofollowThing` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `followThing` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `followerid` on the `followThing` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Blog` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userName]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "_UserTofollowThing_B_index";

-- DropIndex
DROP INDEX "_UserTofollowThing_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_UserTofollowThing";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_followThing" (
    "followerId" INTEGER NOT NULL DEFAULT 1,
    "followingId" INTEGER NOT NULL DEFAULT 2,

    PRIMARY KEY ("followerId", "followingId"),
    CONSTRAINT "followThing_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "followThing_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
DROP TABLE "followThing";
ALTER TABLE "new_followThing" RENAME TO "followThing";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Blog_title_key" ON "Blog"("title");

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");
