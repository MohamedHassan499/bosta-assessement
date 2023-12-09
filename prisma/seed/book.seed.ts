import prisma from '../../src/helpers/db/prisma.helper'
import { faker } from '@faker-js/faker'

export const seedBooks = async () => {
  try {
    for (let i = 0; i < 20; i += 1) {
      await prisma.book.create({
        data: {
          title: faker.lorem.words(3),
          author: faker.name.firstName(),
          publisher: faker.company.name(),
          isbn: faker.random.alphaNumeric(10),
          shelfLocation: faker.random.alphaNumeric(5),
          quantity: faker.datatype.number(10),
          price: faker.datatype.number(100),
          category: {
            connectOrCreate: {
              where: {
                name: faker.lorem.word(1),
              },
              create: {
                name: faker.lorem.word(1),
              },
            },
          },
        },
      })
    }
  } catch (error) {
    console.error({ error })
  }
}

seedBooks()
