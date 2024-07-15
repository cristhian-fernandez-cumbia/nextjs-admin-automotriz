import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const roles = await prisma.role.createMany({
      data: [
        { nameRole: 'gerencial' },
        { nameRole: 'administrativo' },
        { nameRole: 'tecnico' }
      ]
    });

    const menus = await prisma.menu.createMany({
      data: [
        { nameMenu: 'clientes' },
        { nameMenu: 'seguimiento' },
        { nameMenu: 'configuracion' },
        { nameMenu: 'reportes' }
      ]
    });

    const roleMenus = await prisma.roleMenu.createMany({
      data: [
        { roleId: roles[0].idRole, menuId: menus[0].idMenu }, // gerencial - clientes
        { roleId: roles[0].idRole, menuId: menus[1].idMenu }, // gerencial - seguimiento
        { roleId: roles[0].idRole, menuId: menus[2].idMenu }, // gerencial - configuracion
        { roleId: roles[0].idRole, menuId: menus[3].idMenu }, // gerencial - reportes
        { roleId: roles[1].idRole, menuId: menus[0].idMenu }, // administrativo - clientes
        { roleId: roles[1].idRole, menuId: menus[3].idMenu }, // administrativo - reportes
        { roleId: roles[2].idRole, menuId: menus[1].idMenu }  // tecnico - seguimiento
      ]
    });

    console.log({ roles, menus, roleMenus });
  } catch (error) {
    console.error('Error executing seed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();