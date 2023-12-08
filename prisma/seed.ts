import { seedPermissions } from './seed/permission.seed'
import { seedUser } from './seed/user.seed'

const seedDatabase = async () => {
  try {
    await seedUser()
    await seedPermissions()
  } catch (error) {
    console.error({ error })
  }
}

seedDatabase()
