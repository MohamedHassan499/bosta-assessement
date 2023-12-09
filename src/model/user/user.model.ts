import { Request, Response } from 'express'
import prisma from '../../helpers/db/prisma.helper'

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: {
          name: 'borrower',
        },
      },
    })
    return res.status(200).json(users)
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      message: 'Internal Server Error',
    })
  }
}

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!id) {
      res.status(400).send('User ID is missing')
    }
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    })
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      })
    }
    return res.status(200).json(user)
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      message: 'Internal Server Error',
    })
  }
}

export const createUser = async (req: Request, res: Response) => {
  try {
    const {
      email,
      password,
      name,
      roleName,
    }: {
      email: string
      password: string
      name: string
      roleName: 'admin' | 'borrower'
    } = req.body
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password,
        name,
        role: {
          connect: {
            name: roleName,
          },
        },
      },
    })
    return res.status(201).json({
      message: 'User created successfully',
      user,
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      message: 'Internal Server Error',
    })
  }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!id) {
      res.status(400).send('User ID is missing')
    }
    const {
      email,
      password,
      name,
      roleName,
    }: {
      email: string
      password: string
      name: string
      roleName: 'admin' | 'borrower'
    } = req.body
    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        email: email.toLowerCase(),
        password,
        name,
        role: {
          connect: {
            name: roleName,
          },
        },
      },
    })
    return res.status(200).json({
      message: 'User updated successfully',
      user,
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      message: 'Internal Server Error',
    })
  }
}
