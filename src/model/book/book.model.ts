import { Request, Response } from 'express'
import prisma from '../../helpers/db/prisma.helper'

export const getBooks = async (req: Request, res: Response) => {
  try {
    const { filter = {} } = JSON.parse(req.query.filter as string)
    const { order = { createdAt: 'asc' } } = JSON.parse(req.query.order as string)
    Object.keys(filter).forEach((key) => {
      filter[key] = {
        contains: filter[key],
        mode: 'insensitive',
      }
    })
    const books = await prisma.book.findMany({
      where: {
        ...filter,
      },
      orderBy: order,
    })
    res.status(200).json(books)
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      message: 'Internal Server Error',
    })
  }
}

export const getBookByIsbn = async (req: Request, res: Response) => {
  try {
    const { isbn } = req.params
    if (!isbn) {
      res.status(400).send('Book ISBN is missing')
    }
    const book = await prisma.book.findUnique({
      where: {
        isbn,
      },
    })
    res.status(200).json(book)
  } catch (err) {
    return res.status(500).json({
      message: 'Internal Server Error',
    })
  }
}

export const createBook = async (req: Request, res: Response) => {
  try {
    const book = await prisma.book.create({
      data: {
        ...req.body,
        category: {
          connectOrCreate: {
            where: {
              name: req.body.category,
            },
            create: {
              name: req.body.category,
            },
          },
        },
      },
    })
    res.status(201).json(book)
  } catch (error) {
    console.error(error)
    return res.status(500).json(error)
  }
}

export const updateBook = async (req: Request, res: Response) => {
  try {
    const { isbn } = req.params
    if (!isbn) {
      res.status(400).send('Book ISBN is missing')
    }
    const book = await prisma.book.update({
      where: {
        isbn,
      },
      data: {
        ...req.body,
        category: {
          connectOrCreate: {
            where: {
              name: req.body.category,
            },
            create: {
              name: req.body.category,
            },
          },
        },
      },
    })
    res.status(200).json(book)
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      message: 'Internal Server Error',
    })
  }
}

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { isbn } = req.params
    if (!isbn) {
      res.status(400).send('Book ISBN is missing')
    }
    const book = await prisma.book.delete({
      where: {
        isbn,
      },
    })
    res.status(200).json(book)
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      message: 'Internal Server Error',
    })
  }
}
