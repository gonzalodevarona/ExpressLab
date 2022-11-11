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

loginRouter.delete('/:id', [authMiddleware, getUser], async (req : any, res  : any) => {

  if(res.user._id != req.userId ){
    res.status(403).json({ message: "this is not your user therefore you cannot delete it" })
    return
  }

  try {
    await res.user.remove()
    res.json({ message: 'Deleted User' })
  } catch (err  : any) {
    res.status(500).json({ message: err.message })
  }
  
})

export default loginRouter;