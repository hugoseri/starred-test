/*
  Warnings:

  - The primary key for the `FavoriteJob` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `jobId` on the `FavoriteJob` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "FavoriteJob" DROP CONSTRAINT "FavoriteJob_pkey",
DROP COLUMN "jobId",
ADD COLUMN     "jobId" INTEGER NOT NULL,
ADD CONSTRAINT "FavoriteJob_pkey" PRIMARY KEY ("userId", "jobId");
