import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import configs from '../config'
import { userHasPermission } from '../auth/user-permissions'
const auth = (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = req.headers.authorization

  const token = Array.isArray(authorizationHeader) ? authorizationHeader[0].split(' ')[1] : authorizationHeader?.split(' ')[1]
  if (!token) {
    return res.status(401).json({
      message: 'Access Denied',
    })
  }

  jwt.verify(token, configs.ACCESS_TOKEN_SECRET, async (err: unknown, user: any) => {
    if (err) {
      return res.status(401).json({
        message: 'Invalid Token',
      })
    }
    const resource = req.baseUrl.split('/')[1]
    const action = req.method
    if (!(await userHasPermission(user.id, resource, action))) {
      return res.status(403).json({
        message: 'Forbidden',
      })
    }
    next()
  })
}

export default auth
