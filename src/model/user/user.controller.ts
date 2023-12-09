import express from 'express'
import { validateCreateUser, validateUpdateUser } from '../../model/user/user.validate'
import { getUsers, getUserById, createUser, updateUser } from './user.model'
const userRouter = express.Router()

userRouter.get('/', getUsers)
userRouter.get('/:id', getUserById)
userRouter.post('/', validateCreateUser, createUser)
userRouter.put('/:id', validateUpdateUser, updateUser)
userRouter.delete('/:id')

export default userRouter
