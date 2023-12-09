import { Request, Response, NextFunction } from 'express'
import * as yup from 'yup'

export const createBookSchema = yup.object({
  title: yup.string().required('Title is required'),
  author: yup.string().required('Author is required'),
  publisher: yup.string().required('Publisher is required'),
  isbn: yup.string().required('ISBN is required'),
  shelfLocation: yup.string().required('Shelf Location is required'),
  quantity: yup.number().required('Quantity is required'),
  price: yup.number().min(1).required('Price is required'),
  category: yup.string().required('Category is required'),
})

export const updateUserSchema = createBookSchema.partial()

export const validateCreateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await createBookSchema.validate(req.body, { abortEarly: false })
    next()
  } catch (error) {
    // console.error(error)
    return res.status(400).json(error)
  }
}

export const validateUpdateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await updateUserSchema.validate(req.body, { abortEarly: false })
    next()
  } catch (error) {
    // console.error(error)
    return res.status(400).json(error)
  }
}
