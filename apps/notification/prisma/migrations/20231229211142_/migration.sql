/*
 Warnings:

 - Added the required column `key` to the `Provider` table without a default value. This is not possible if the table is not empty.
 */
-- AlterTable
ALTER TABLE "Provider"
  ADD COLUMN "key" VARCHAR(64) NOT NULL;

