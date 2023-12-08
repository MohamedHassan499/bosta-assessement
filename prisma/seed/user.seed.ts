import { hash } from '../../src/helpers/cryptography/hash'
import prisma from '../../src/helpers/db/prisma.helper'

export const seedUser = async () => {
  try {
    await prisma.user.create({
      data: {
        name: 'admin',
        username: 'admin',
        password: await hash('admin'),
        role: {
          connectOrCreate: {
            where: {
              name: 'admin',
            },
            create: {
              name: 'admin',
            },
          },
        },
      },
    })

    await prisma.user.create({
      data: {
        name: 'operator',
        username: 'operator',
        password: await hash('operator'),
        role: {
          connectOrCreate: {
            where: {
              name: 'operator',
            },
            create: {
              name: 'operator',
            },
          },
        },
      },
    })
  } catch (error) {
    console.error({ error })
  }
}
