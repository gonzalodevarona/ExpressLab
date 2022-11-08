import express from 'express'
import Product from '../models/product'

const router = express.Router()

// router.get('/', (_req, res) => {
//     console.log('ok')
//     res.send('Fetching data')
// })

// Getting all
router.get('/', async (_req, res) => {
    try {
      const products = await Product.find()
      res.json(products)
    } catch (err : any ) {
      res.status(500).json({ message: err.message })
    }
  })

// Creating one
router.post('/', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    quantity: req.body.quantity,
    brand: req.body.brand,
    ownerId: req.body.ownerId,
  })
  try {
    const newProduct = await product.save()
    res.status(201).json(newProduct)
  } catch (err : any) {
    res.status(400).json({ message: err.message })
  }
})

export default router