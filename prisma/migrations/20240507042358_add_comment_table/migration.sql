-- CreateTable
CREATE TABLE "product_comments" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "left" INTEGER NOT NULL DEFAULT 0,
    "right" INTEGER NOT NULL DEFAULT 0,
    "parent_id" INTEGER,
    "user_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_comments_parent_id_key" ON "product_comments"("parent_id");

-- AddForeignKey
ALTER TABLE "product_comments" ADD CONSTRAINT "product_comments_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "product_comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_comments" ADD CONSTRAINT "product_comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_comments" ADD CONSTRAINT "product_comments_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
