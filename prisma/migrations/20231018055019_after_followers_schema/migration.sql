/*
  Warnings:

  - You are about to drop the column `followers` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "followers",
ADD COLUMN     "followerCount" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Followers" (
    "id" SERIAL NOT NULL,
    "parentId" INTEGER NOT NULL,
    "followerId" INTEGER NOT NULL,

    CONSTRAINT "Followers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Followers" ADD CONSTRAINT "Followers_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
