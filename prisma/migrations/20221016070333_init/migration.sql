/*
  Warnings:

  - Added the required column `year` to the `study_groups` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `study_groups` ADD COLUMN `year` INTEGER NOT NULL;
