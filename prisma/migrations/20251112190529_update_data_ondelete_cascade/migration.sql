-- DropForeignKey
ALTER TABLE "data" DROP CONSTRAINT "data_userId_fkey";

-- AddForeignKey
ALTER TABLE "data" ADD CONSTRAINT "data_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
