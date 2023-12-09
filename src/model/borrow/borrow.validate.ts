import { Request, Response, NextFunction } from 'express'
import * as yup from 'yup'

export const validateCheckoutBook = (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = yup.object({
      returnDate: yup.date().required('Return Date is required'),
    })
    schema.validateSync(req.body)
    next()
  } catch (error) {
    return res.status(400).json(error)
  }
}
