import { Request, Response, NextFunction } from 'express'
import zod from 'zod'
import { createUserSchema } from '../../model/user/user.validate'

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = zod.object({
      username: zod.string(),
      password: zod.string(),
    })
    schema.parse(req.body)
    next()
  } catch (error) {
    console.error(error)
    return res.status(400).json({
      message: 'Invalid Data',
    })
  }
}

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = createUserSchema
    schema.parse(req.body)
    next()
  } catch (error) {
    console.error(error)
    return res.status(400).json({
      message: 'Invalid Data',
    })
  }
}
