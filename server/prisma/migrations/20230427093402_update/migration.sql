/*
  Warnings:

  - The primary key for the `tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `tag` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ArticleToTag" DROP CONSTRAINT "_ArticleToTag_B_fkey";

-- AlterTable
ALTER TABLE "_ArticleToTag" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "tag" DROP CONSTRAINT "tag_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "tag_pkey" PRIMARY KEY ("name");

-- AddForeignKey
ALTER TABLE "_ArticleToTag" ADD CONSTRAINT "_ArticleToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tag"("name") ON DELETE CASCADE ON UPDATE CASCADE;
