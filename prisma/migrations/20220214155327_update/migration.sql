-- DropIndex
DROP INDEX "Post_id_key";

-- DropIndex
DROP INDEX "Profile_id_key";

-- AlterTable
ALTER TABLE "Post" ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_pkey" PRIMARY KEY ("id");
