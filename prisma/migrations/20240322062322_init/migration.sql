-- CreateTable
CREATE TABLE "item" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "page_url" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "added_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "limited_discount" (
    "item_id" INTEGER NOT NULL,
    "added_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "price" INTEGER NOT NULL,

    CONSTRAINT "limited_discount_pkey" PRIMARY KEY ("item_id","added_on")
);

-- AddForeignKey
ALTER TABLE "limited_discount" ADD CONSTRAINT "limited_discount_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
