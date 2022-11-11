import jwt from 'jsonwebtoken'
import express from 'express'
import User from '../models/User'
import authMiddleware from '../middleware/Auth';

const loginRouter = express.Router()

// Register user
loginRouter.post('/register', async (request, response) => {
  const { username, name, email, identification, password, active } = request.body

  if ([name, email, identification, password, active].includes(undefined)) {
    response.status(400).json({ message: "Missing arguments" })
  }

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

loginRouter.delete('/', authMiddleware, async (req: any, res: any) => {

  try {
    const removedUser = await User.findOneAndRemove(req.userId);
    res.json({
      message: 'Deleted User',
      ...removedUser
    })
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }

})

loginRouter.patch('/', authMiddleware, async (req: any, res: any) => {

  const { name, email, identification, active } = req.body

  if ([name, email, identification, active].includes(undefined)) {
    res.status(400).json({ message: "Missing arguments" })
  }

  try {
    const updatedProduct = await User.findByIdAndUpdate(req.userId, { ...req.body });
    res.json(updatedProduct)
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
})

loginRouter.get('/', authMiddleware, async (req: any, res: any) => {

  try {
    const updatedProduct = await User.findById(req.userId);
    res.json(updatedProduct)
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }

})

export default loginRouter;