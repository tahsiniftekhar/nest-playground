/*
  Warnings:

  - You are about to drop the column `qauntity` on the `Order` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "qauntity",
ADD COLUMN     "quantity" INTEGER NOT NULL;
