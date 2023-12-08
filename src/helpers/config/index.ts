import { Configs } from '../types/types'

const configs: Configs = {
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || '',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || '',
  JWT_ACCESS_TOKEN_EXPIRES: process.env.JWT_ACCESS_TOKEN_EXPIRES || '',
  JWT_REFRESH_TOKEN_EXPIRES: process.env.JWT_REFRESH_TOKEN_EXPIRES || '',
  JWT_SECRET: process.env.JWT_SECRET || '',
  API_DOMAIN: process.env.API_DOMAIN || '',
  API_PORT: process.env.API_PORT || '3000',
}

export default configs
