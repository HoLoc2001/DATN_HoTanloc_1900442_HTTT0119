/*
  Warnings:

  - The primary key for the `Bookmark` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("id");
