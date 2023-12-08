import prisma from '../db/prisma.helper'

const userPermissions = async (userId: number) => {
  const permissions = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      role: {
        include: {
          rolePermissions: {
            include: {
              permission: true,
            },
          },
        },
      },
    },
  })
  return permissions
}

export const userHasPermission = async (userId: number, resource: string, verb: string) => {
  const permissions = await userPermissions(userId)
  const cruds: {
    [key: string]: string
  } = {
    POST: 'create',
    GET: 'read',
    PUT: 'update',
    DELETE: 'delete',
  }
  const crud = cruds[verb]
  const permissionName = `${crud}:${resource}`
  const hasPermission = permissions?.role?.rolePermissions?.some((rolePermission) => {
    return rolePermission.permission.name.toLowerCase() === permissionName.toLowerCase()
  })
  return hasPermission
}
