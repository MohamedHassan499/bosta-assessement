import { Request, Response, NextFunction } from 'express'
import * as yup from 'yup'

export const createUserSchema = yup.object({
  email: yup.string().email('Invalid Email').required('Email is required'),
  password: yup
    .string()
    .min(8)
    .max(32)
    .matches(/^[a-zA-z0-9]+$/, 'Password must be alphanumeric')
    .required('Password is required'),
  name: yup.string().required('Name is required'),
})

export const updateUserSchema = yup
  .object({
    email: yup.string().email('Invalid Email').required('Email is required'),
    password: yup
      .string()
      .min(8)
      .max(32)
      .matches(/^[a-zA-z0-9]+$/, 'Password must be alphanumeric')
      .required('Password is required'),
    name: yup.string().required('Name is required'),
  })
  .nullable() // Using nullable to allow undefined or null values

export const validateCreateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await createUserSchema.validate(req.body, { abortEarly: false })
    next()
  } catch (error) {
    // console.error(error)
    return res.status(400).json(error)
  }
}

export const validateUpdateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await updateUserSchema.validate(req.body, { abortEarly: false })
    next()
  } catch (error) {
    // console.error(error)
    return res.status(400).json(error)
  }
}
