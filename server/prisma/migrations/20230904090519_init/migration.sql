/*
  Warnings:

  - Added the required column `chude` to the `articles` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Chude" AS ENUM ('TINTUC', 'TUYENDUNG', 'CAUHOI');

-- AlterTable
ALTER TABLE "articles" ADD COLUMN     "chude" "Chude" NOT NULL;
