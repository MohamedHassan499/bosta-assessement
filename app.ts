import express from 'express'
import { connectDatabase } from './src/helpers/db/prisma.helper'
import authRouter from './src/helpers/router/auth'
const app = express()
app.use(express.json())

app.use('/auth', authRouter)

app.listen(3000, async () => {
  try {
    console.log('Server is running at port 3000')
    await connectDatabase()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})
