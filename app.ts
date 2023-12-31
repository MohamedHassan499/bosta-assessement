import express from 'express'
import { connectDatabase } from './src/helpers/db/prisma.helper'
import authRouter from './src/helpers/router/auth'
import auth from './src/helpers/middleware/auth'
import userRouter from './src/model/user/user.controller'
import bookRouter from './src/model/book/book.controller'
import borrowRouter from './src/model/borrow/borrow.controller'

const app = express()
app.use(express.json())

app.use('/auth', authRouter)
app.use('/user', auth, userRouter)
app.use('/book', auth, bookRouter)
app.use('/borrow', borrowRouter)

app.listen(3000, async () => {
  try {
    console.log('Server is running at port 3000')
    await connectDatabase()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})
