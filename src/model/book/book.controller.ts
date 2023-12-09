import express from 'express'
import { validateCreateBook, validateUpdateBook } from './book.validate'
import { getBooks, getBookById, createBook, updateBook } from './book.model'
const bookRouter = express.Router()

bookRouter.get('/', getBooks)
bookRouter.get('/:id', getBookById)
bookRouter.post('/', validateCreateBook, createBook)
bookRouter.put('/:id', validateUpdateBook, updateBook)
bookRouter.delete('/:id')

export default bookRouter
