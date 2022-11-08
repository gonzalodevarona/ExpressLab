import express from 'express'
import Product from '../models/product'
import authMiddleware from '../middleware/Auth';
const router = express.Router()

// TODO: Verificar que el user de la request si es el dueno del producto con request.userId
// para los endpoints que requieran acceder a un producto creado


// Getting all
router.get('/', authMiddleware, async (req: any, res) => {
    try {
      const products = await Product.find({ownerId: req.userId})
      res.json(products)
    } catch (err : any ) {
      res.status(500).json({ message: err.message })
    }
  })

// Creating one
router.post('/', authMiddleware, async (req, res) => {
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