/*
  Warnings:

  - You are about to drop the `TagArticle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TagArticle" DROP CONSTRAINT "TagArticle_article_id_fkey";

-- DropForeignKey
ALTER TABLE "TagArticle" DROP CONSTRAINT "TagArticle_tag_name_fkey";

-- AlterTable
ALTER TABLE "tag" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "tag_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "TagArticle";

-- CreateTable
CREATE TABLE "_ArticleToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ArticleToTag_AB_unique" ON "_ArticleToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ArticleToTag_B_index" ON "_ArticleToTag"("B");

-- AddForeignKey
ALTER TABLE "_ArticleToTag" ADD CONSTRAINT "_ArticleToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleToTag" ADD CONSTRAINT "_ArticleToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
