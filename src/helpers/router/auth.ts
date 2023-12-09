import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { validateLogin, validateRegister } from '../middleware/validate.auth'
import prisma from '../db/prisma.helper'
import configs from '../config'
import { hash, verifyHash } from '../cryptography/hash'

const authRouter = express()

authRouter.use(express.json())

const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  })
}

authRouter.post('/refresh', async (req: Request, res: Response) => {
  const { refreshToken } = req.body
  const accessToken = req.headers['authorization']?.split(' ')[1]
  if (!refreshToken || !accessToken) {
    return res.status(401).json({
      message: 'Access Denied',
    })
  }
  const verified = jwt.verify(refreshToken, configs.REFRESH_TOKEN_SECRET, (err: unknown, user: any) => {
    if (err) {
      return res.status(403).json({
        message: 'Invalid Token',
      })
    }
    return user
  })
  const newAccessToken = await jwt.sign({ id: verified }, configs.ACCESS_TOKEN_SECRET, {
    expiresIn: configs.JWT_ACCESS_TOKEN_EXPIRES,
  })
  return res.status(200).json({
    accessToken: newAccessToken,
  })
})

authRouter.post('/login', validateLogin, async (req: Request, res: Response) => {
  const { email, password } = req.body
  const user = await findUserByEmail(email.toLowerCase())
  const isPasswordValid = await verifyHash(password, user?.password || '')
  if (!user || !isPasswordValid) {
    return res.status(400).json({
      message: 'Invalid Email or Password',
    })
  }
  const accessToken = jwt.sign({ id: user.id }, configs.ACCESS_TOKEN_SECRET, {
    expiresIn: configs.JWT_ACCESS_TOKEN_EXPIRES,
  })
  const refreshToken = jwt.sign({ id: user.id }, configs.REFRESH_TOKEN_SECRET, {
    expiresIn: configs.JWT_REFRESH_TOKEN_EXPIRES,
  })
  return res.status(200).json({
    accessToken,
    refreshToken,
    user: {
      ...user,
      password: undefined,
    },
  })
})

authRouter.post('/register', validateRegister, async (req: Request, res: Response) => {
  const { email, password, name } = req.body
  try {
    const user = await findUserByEmail(email.toLowerCase())
    if (user) {
      return res.status(400).json({
        message: 'Email already exists',
      })
    }
    await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: await hash(password),
        name,
        roleId: 1,
      },
    })
    return res.status(201).json({
      message: 'User created successfully',
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      message: 'Internal Server Error',
    })
  }
})

export default authRouter
