export type Configs = {
  ACCESS_TOKEN_SECRET: string
  REFRESH_TOKEN_SECRET: string
  JWT_ACCESS_TOKEN_EXPIRES: string
  JWT_REFRESH_TOKEN_EXPIRES: string
  JWT_SECRET: string
  API_DOMAIN: string
  API_PORT: string
}

export type Pagination = {
  skip: number
  take: number
}
