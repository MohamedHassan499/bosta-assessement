import { Request, Response } from 'express'
import prisma from '../../helpers/db/prisma.helper'

export const checkoutBook = async (req: Request, res: Response) => {
  try {
    const { borrowerId, isbn } = req.params
    if (!isbn) {
      res.status(400).send('Book ISBN is missing')
    }
    if (!borrowerId) {
      res.status(400).send('Borrower ID is missing')
    }
    const requestedBook = await prisma.book.findUnique({
      where: {
        isbn,
      },
    })
    if (!requestedBook) {
      return res.status(404).json({
        message: 'Book not found',
      })
    }
    if (requestedBook.quantity === 0) {
      return res.status(404).json({
        message: 'Book is not available',
      })
    }
    const borrowStatus = await prisma.borrowing.update({
      where: {
        id: Number(borrowerId),
        bookIsbn: isbn,
      },
      data: {
        status: 'BORROWED',
        returnDate: req.body.returnDate,
        borrowDate: new Date(),
      },
    })
    res.status(200).json(borrowStatus)
  } catch (error) {
    console.error(error)
    return res.status(500).json(error)
  }
}

export const returnBook = async (req: Request, res: Response) => {
  try {
    const { borrowerId, isbn } = req.params
    if (!isbn) {
      res.status(400).send('Book ISBN is missing')
    }
    if (!borrowerId) {
      res.status(400).send('Borrower ID is missing')
    }
    const borrowStatus = await prisma.borrowing.update({
      where: {
        id: Number(borrowerId),
        bookIsbn: isbn,
      },
      data: {
        status: 'RETURNED',
      },
    })
    await prisma.book.update({
      where: {
        isbn,
      },
      data: {
        quantity: {
          increment: 1,
        },
      },
    })
    res.status(200).json(borrowStatus)
  } catch (error) {
    console.error(error)
    return res.status(500).json(error)
  }
}

export const checkBorrowedBooks = async (req: Request, res: Response) => {
  try {
    const { borrowerId } = req.params
    if (!borrowerId) {
      res.status(400).send('Borrower ID is missing')
    }
    const borrowStatus = await prisma.borrowing.findMany({
      where: {
        borrowerId: Number(borrowerId),
      },
    })
    res.status(200).json(borrowStatus)
  } catch (error) {
    console.error(error)
    return res.status(500).json(error)
  }
}

export const listDueBooks = async (req: Request, res: Response) => {
  try {
    const { borrowerId } = req.params
    if (!borrowerId) {
      res.status(400).send('Borrower ID is missing')
    }
    const borrowStatus = await prisma.borrowing.findMany({
      where: {
        borrowerId: Number(borrowerId),
        status: 'REQUESTED',
      },
    })
    res.status(200).json(borrowStatus)
  } catch (error) {
    console.error(error)
    return res.status(500).json(error)
  }
}

export const listBorrowedBooks = async (req: Request, res: Response) => {
  try {
    const { borrowerId } = req.params
    if (!borrowerId) {
      res.status(400).send('Borrower ID is missing')
    }
    const borrowStatus = await prisma.borrowing.findMany({
      where: {
        borrowerId: Number(borrowerId),
        status: 'BORROWED',
      },
    })
    res.status(200).json(borrowStatus)
  } catch (error) {
    console.error(error)
    return res.status(500).json(error)
  }
}

export const listOverdueBooks = async (req: Request, res: Response) => {
  try {
    const borrowStatus = await prisma.borrowing.findMany({
      where: {
        status: 'BORROWED',
        returnDate: {
          lt: new Date(),
        },
      },
    })
    res.status(200).json(borrowStatus)
  } catch (error) {
    console.error(error)
    return res.status(500).json(error)
  }
}
