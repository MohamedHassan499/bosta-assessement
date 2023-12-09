import express from 'express'
import { validateCreateBook, validateUpdateBook } from './book.validate'
import { getBooks, getBookById, createBook, updateBook } from './book.model'
const bookRouter = express.Router()

bookRouter.get('/', getBooks)
bookRouter.get('/:isbn', getBookById)
bookRouter.post('/', validateCreateBook, createBook)
bookRouter.put('/:isbn', validateUpdateBook, updateBook)
bookRouter.delete('/:isbn')

export default bookRouter
