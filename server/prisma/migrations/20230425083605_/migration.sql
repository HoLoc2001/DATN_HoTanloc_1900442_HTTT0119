/*
  Warnings:

  - You are about to drop the column `tag` on the `articles` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('LOCAL', 'GOOGLE');

-- AlterTable
ALTER TABLE "articles" DROP COLUMN "tag",
ADD COLUMN     "tags" INTEGER[];

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "provider" "Provider" NOT NULL DEFAULT 'LOCAL',
ALTER COLUMN "password" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Tag_id_idx" ON "Tag"("id");
