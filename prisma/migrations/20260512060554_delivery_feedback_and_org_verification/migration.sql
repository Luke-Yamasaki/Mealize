-- AlterTable
ALTER TABLE "organizations" ADD COLUMN     "mealize_verified_kitchen" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "mealize_verified_nonprofit" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "delivery_feedback" (
    "id" SERIAL NOT NULL,
    "deliveryId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" VARCHAR(500),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "delivery_feedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "delivery_feedback_deliveryId_userId_key" ON "delivery_feedback"("deliveryId", "userId");

-- AddForeignKey
ALTER TABLE "delivery_feedback" ADD CONSTRAINT "delivery_feedback_deliveryId_fkey" FOREIGN KEY ("deliveryId") REFERENCES "deliveries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_feedback" ADD CONSTRAINT "delivery_feedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
