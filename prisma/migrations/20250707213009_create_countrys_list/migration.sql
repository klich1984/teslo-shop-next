-- CreateTable
CREATE TABLE "Countrys" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Countrys_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Countrys_id_key" ON "Countrys"("id");
