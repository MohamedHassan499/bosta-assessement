import { hash } from '../../src/helpers/cryptography/hash'
import prisma from '../../src/helpers/db/prisma.helper'

export const seedUser = async () => {
  try {
    await prisma.user.create({
      data: {
        name: 'admin',
        email: 'admin@gmail.com',
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
        name: 'borrower',
        email: 'borrower@gmail.com',
        password: await hash('borrower'),
        role: {
          connectOrCreate: {
            where: {
              name: 'borrower',
            },
            create: {
              name: 'borrower',
            },
          },
        },
      },
    })
  } catch (error) {
    console.error({ error })
  }
}
