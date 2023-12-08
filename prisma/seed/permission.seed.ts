import prisma, { getModels } from '../../src/helpers/db/prisma.helper'

const seedRolePermission = async (role: 'admin' | 'borrower', cruds: string[], models: string[]) => {
  const roleId: Record<'admin' | 'borrower', number> = {
    admin: 1,
    borrower: 2,
  }
  for (const model of models) {
    for (const crud of cruds) {
      const permissionName: string = `${crud}:${model}`
      await prisma.rolePermission.create({
        data: {
          permission: {
            connectOrCreate: {
              create: {
                name: permissionName,
                description: `permission to ${crud} ${model}`,
              },
              where: { name: permissionName },
            },
          },
          role: { connect: { id: roleId[role] } },
        },
      })
    }
  }
}

export const seedPermissions = async () => {
  try {
    const models = getModels().map((model) => model.name)
    const borrowerModels = ['Book', 'Borrowing', 'Category']
    await seedRolePermission('admin', ['read', 'create', 'update', 'delete'], models)
    await seedRolePermission('borrower', ['read'], ['Book', 'Category', 'Borrowing'])
    await seedRolePermission('borrower', ['create'], borrowerModels)
  } catch (error) {
    console.error({ error })
  }
}
