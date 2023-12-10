-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('SMS', 'EMAIL');

-- CreateEnum
CREATE TYPE "SmsStatus" AS ENUM ('SENDING', 'SENT', 'NOT_SENT');

-- CreateEnum
CREATE TYPE "SmsTemplateType" AS ENUM ('TEXTUAL', 'PATTERN');

-- CreateEnum
CREATE TYPE "ProviderType" AS ENUM ('SMS', 'EMAIL');

-- CreateTable
CREATE TABLE "notification" (
    "id" SERIAL NOT NULL,
    "type" "NotificationType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sms" (
    "id" SERIAL NOT NULL,
    "receiver" VARCHAR(64) NOT NULL,
    "messages" VARCHAR(256)[],
    "notification_id" INTEGER NOT NULL,
    "status" "SmsStatus" NOT NULL,
    "sms_template_id" INTEGER,
    "provider_tracking_id" TEXT,
    "providerId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sms_template" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "key" VARCHAR(64) NOT NULL,
    "message" VARCHAR(256) NOT NULL,
    "type" "SmsTemplateType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sms_template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Provider" (
    "id" SERIAL NOT NULL,
    "type" "ProviderType" NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "credentials" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Provider_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sms_notification_id_key" ON "sms"("notification_id");

-- CreateIndex
CREATE UNIQUE INDEX "sms_template_key_key" ON "sms_template"("key");

-- AddForeignKey
ALTER TABLE "sms" ADD CONSTRAINT "sms_notification_id_fkey" FOREIGN KEY ("notification_id") REFERENCES "notification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sms" ADD CONSTRAINT "sms_sms_template_id_fkey" FOREIGN KEY ("sms_template_id") REFERENCES "sms_template"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sms" ADD CONSTRAINT "sms_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
