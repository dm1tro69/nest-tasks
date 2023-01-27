/*
  Warnings:

  - Added the required column `description` to the `Tasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Tasks` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'DONE');

-- AlterTable
ALTER TABLE "Tasks" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "status" "TaskStatus" NOT NULL DEFAULT 'OPEN',
ADD COLUMN     "title" TEXT NOT NULL;
