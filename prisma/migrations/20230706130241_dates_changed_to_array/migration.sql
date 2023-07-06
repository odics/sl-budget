/*
  Warnings:

  - The `dates` column on the `RecurringIncome` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "RecurringIncome" DROP COLUMN "dates",
ADD COLUMN     "dates" TEXT[];
