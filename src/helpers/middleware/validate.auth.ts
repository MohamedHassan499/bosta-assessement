import { Request, Response, NextFunction } from 'express'
import { createUserSchema } from '../../model/user/user.validate'
import * as yup from 'yup'

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = yup.object({
      email: yup.string().email().required('Email is required'),
      password: yup
        .string()
        .required('Password is required')
        .matches(/^[a-zA-z0-9]+$/, 'Password must be alphanumeric'),
    })
    schema.validateSync(req.body)
    next()
  } catch (error) {
    return res.status(400).json(error)
  }
}

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = createUserSchema
    schema.validateSync(req.body)
    next()
  } catch (error) {
    console.error(error)
    return res.status(400).json({
      message: 'Invalid Data',
    })
  }
}
