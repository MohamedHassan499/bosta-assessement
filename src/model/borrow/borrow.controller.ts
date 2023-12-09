import express from 'express'
import { checkoutBook, returnBook, listBorrowedBooks, listOverdueBooks } from './borrow.model'
import { validateCheckoutBook } from './borrow.validate'

const borrowRouter = express.Router()

borrowRouter.post('/borrow/:borrowerId/check-out/:isbn', validateCheckoutBook, checkoutBook)
borrowRouter.post('/borrow/:borrowerId/return/:isbn', returnBook)
borrowRouter.get('/borrow/:borrowerId', listBorrowedBooks)
borrowRouter.get('/borrow/overdue-books', listOverdueBooks)

export default borrowRouter
