import jwt from 'jsonwebtoken'

export default (request: any, response: any, next: any) => {
  const authorization = request.get('authorization')
  let token = ''

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }

  if (!token) {
    return response.status(401).json({ error: 'token missing' })
  }

  const decodedToken = jwt.verify(token, process.env.SECRET as jwt.Secret) as jwt.JwtPayload

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid or expired' })
  }

  const { id: userId } = decodedToken

  request.userId = userId // Agregar la user id a la request

  next()
}