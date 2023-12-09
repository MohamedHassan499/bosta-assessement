import express from 'express'
import { validateCreateBook, validateUpdateBook } from './book.validate'
import { getBooks, getBookByIsbn, createBook, updateBook } from './book.model'
const bookRouter = express.Router()

bookRouter.get('/', getBooks)
bookRouter.get('/:isbn', getBookByIsbn)
bookRouter.post('/', validateCreateBook, createBook)
bookRouter.put('/:isbn', validateUpdateBook, updateBook)
bookRouter.delete('/:isbn')

export default bookRouter
