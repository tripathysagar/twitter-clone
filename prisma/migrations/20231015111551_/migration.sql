/*
  Warnings:

  - You are about to drop the column `like` on the `Tweet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tweet" DROP COLUMN "like",
ADD COLUMN     "likesCount" INTEGER NOT NULL DEFAULT 0;
