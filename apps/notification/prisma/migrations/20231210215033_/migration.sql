/*
  Warnings:

  - Made the column `sms_template_id` on table `sms` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "sms" DROP CONSTRAINT "sms_providerId_fkey";

-- DropForeignKey
ALTER TABLE "sms" DROP CONSTRAINT "sms_sms_template_id_fkey";

-- AlterTable
ALTER TABLE "sms" ALTER COLUMN "sms_template_id" SET NOT NULL,
ALTER COLUMN "providerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "sms" ADD CONSTRAINT "sms_sms_template_id_fkey" FOREIGN KEY ("sms_template_id") REFERENCES "sms_template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sms" ADD CONSTRAINT "sms_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE SET NULL ON UPDATE CASCADE;
