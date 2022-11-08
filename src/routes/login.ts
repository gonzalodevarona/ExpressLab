import jwt from 'jsonwebtoken'
import express from 'express'
import User from '../models/User'


const loginRouter = express.Router()

// Register user
loginRouter.post('/register', async (request, response) => {
  const { body } = request
  const { username, name, password } = body

  const user = new User({
    username,
    name,
    password
  });

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

// Login
loginRouter.post('/login', async (request, response) => {
  const { body } = request
  const { username, password } = body

  const user = await User.findOne({ username })

  const passwordCorrect = user === null ? false : password === user.password;

  if (!(user && passwordCorrect)) {
    response.status(401).json({
      error: 'invalid user or password'
    })
    return;
  }

  const userForToken = {
    id: user._id,
    username: user.username
  }

  const token = jwt.sign(
    userForToken,
    process.env.SECRET as jwt.Secret,
    {
      expiresIn: 60 * 60 * 24 * 7 // Expira en una semana
    }
  )

  response.send({
    name: user.name,
    username: user.username,
    token
  })
})

export default loginRouter;