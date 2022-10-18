/*
  Warnings:

  - Added the required column `acronym` to the `subjects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `subjects` ADD COLUMN `acronym` VARCHAR(15) NOT NULL;
