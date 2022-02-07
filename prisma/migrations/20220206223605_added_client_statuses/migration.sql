-- CreateEnum
CREATE TYPE "Status" AS ENUM ('New', 'Active', 'Fired');

-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "status" "Status" NOT NULL DEFAULT E'New';
