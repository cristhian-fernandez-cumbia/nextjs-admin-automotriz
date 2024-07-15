/*
  Warnings:

  - The primary key for the `Menu` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Menu` table. All the data in the column will be lost.
  - The primary key for the `Role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Role` table. All the data in the column will be lost.
  - The primary key for the `RoleMenu` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `RoleMenu` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `UserRole` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[nameMenu]` on the table `Menu` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nameRole]` on the table `Role` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nameMenu` to the `Menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameRole` to the `Role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RoleMenu" DROP CONSTRAINT "RoleMenu_menuId_fkey";

-- DropForeignKey
ALTER TABLE "RoleMenu" DROP CONSTRAINT "RoleMenu_roleId_fkey";

-- DropForeignKey
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_roleId_fkey";

-- DropForeignKey
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_userId_fkey";

-- DropIndex
DROP INDEX "Menu_name_key";

-- DropIndex
DROP INDEX "Role_name_key";

-- DropIndex
DROP INDEX "RoleMenu_roleId_menuId_key";

-- AlterTable
ALTER TABLE "Menu" DROP CONSTRAINT "Menu_pkey",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "idMenu" SERIAL NOT NULL,
ADD COLUMN     "nameMenu" TEXT NOT NULL,
ADD CONSTRAINT "Menu_pkey" PRIMARY KEY ("idMenu");

-- AlterTable
ALTER TABLE "Role" DROP CONSTRAINT "Role_pkey",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "idRole" SERIAL NOT NULL,
ADD COLUMN     "nameRole" TEXT NOT NULL,
ADD CONSTRAINT "Role_pkey" PRIMARY KEY ("idRole");

-- AlterTable
ALTER TABLE "RoleMenu" DROP CONSTRAINT "RoleMenu_pkey",
DROP COLUMN "id",
ADD COLUMN     "idRoleMenu" SERIAL NOT NULL,
ADD CONSTRAINT "RoleMenu_pkey" PRIMARY KEY ("idRoleMenu");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "idUser" SERIAL NOT NULL,
ADD COLUMN     "roleId" INTEGER NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("idUser");

-- DropTable
DROP TABLE "UserRole";

-- CreateIndex
CREATE UNIQUE INDEX "Menu_nameMenu_key" ON "Menu"("nameMenu");

-- CreateIndex
CREATE UNIQUE INDEX "Role_nameRole_key" ON "Role"("nameRole");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("idRole") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoleMenu" ADD CONSTRAINT "RoleMenu_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("idRole") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoleMenu" ADD CONSTRAINT "RoleMenu_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("idMenu") ON DELETE RESTRICT ON UPDATE CASCADE;
