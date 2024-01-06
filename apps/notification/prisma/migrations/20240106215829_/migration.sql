-- CreateEnum
CREATE TYPE "EmailStatus" AS ENUM ('SENT', 'NOT_SENT', 'SENDING');

-- CreateTable
CREATE TABLE "Email" (
    "id" SERIAL NOT NULL,
    "sender" VARCHAR(256) NOT NULL,
    "receiver" VARCHAR(256) NOT NULL,
    "subject" VARCHAR(256) NOT NULL,
    "message" TEXT NOT NULL,
    "status" "EmailStatus" NOT NULL DEFAULT 'SENDING',
    "notificationId" INTEGER NOT NULL,
    "providerId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Email_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Email_notificationId_key" ON "Email"("notificationId");

-- AddForeignKey
ALTER TABLE "Email" ADD CONSTRAINT "Email_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "notification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Email" ADD CONSTRAINT "Email_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE SET NULL ON UPDATE CASCADE;
