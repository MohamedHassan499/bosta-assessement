import { Prisma, PrismaClient } from '@prisma/client'
// -----------------------------------------------

const prisma: PrismaClient = new PrismaClient()

export const connectDatabase = async () => {
  try {
    await prisma.$connect()
    console.dir('Connected to Database Successfully !')
  } catch (error: any) {
    console.error('Cannot connect to database')
    console.error({ error })
  }
}

export const getModels = (): Prisma.DMMF.Model[] => {
  return Prisma.dmmf.datamodel.models
}

export default prisma
